using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransacoesController : ControllerBase
{
    private readonly AppDbContext _context;

    public TransacoesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
public async Task<IActionResult> Listar()
{
    var lista = await _context.Transacoes
        .Select(t => new
        {
            id = t.Id,
            descricao = t.Descricao,
            valor = t.Valor,
            tipo = t.Tipo,
            pessoaId = t.PessoaId,
            pessoaNome = t.Pessoa != null ? t.Pessoa.Nome : ""
        })
        .ToListAsync();

    return Ok(lista);
}
    [HttpPost]
public async Task<ActionResult> Criar(TransacaoDTO dto)
{
    try
    {
        var pessoa = await _context.Pessoas.FindAsync(dto.PessoaId);

        if (pessoa == null)
            return NotFound("Pessoa não encontrada");

        if (dto.Tipo != "Receita" && dto.Tipo != "Despesa")
            return BadRequest("Tipo inválido. Informe Receita ou Despesa.");

        // Regra de negócio: menores de 18 anos só podem cadastrar despesas.
        if (pessoa.Idade < 18 && dto.Tipo.ToLower() == "receita")
            return BadRequest("Menor de idade só pode despesa");

        var transacao = new Transacao
        {
            Descricao = dto.Descricao,
            Valor = dto.Valor,
            Tipo = dto.Tipo,
            PessoaId = dto.PessoaId
        };

        _context.Transacoes.Add(transacao);
        await _context.SaveChangesAsync();

        return Ok(new
{
    id = transacao.Id,
    descricao = transacao.Descricao,
    valor = transacao.Valor,
    tipo = transacao.Tipo,
    pessoaId = transacao.PessoaId
});

    }
    catch (Exception)
    {
        return StatusCode(500, "Ocorreu um erro interno.");
    }
}}