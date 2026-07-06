using backend.Data;
using backend.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TotaisController : ControllerBase
{
    private readonly AppDbContext _context;

    public TotaisController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<TotaisResponseDTO>> GetTotais()
    {
        var pessoas = await _context.Pessoas
            .Include(p => p.Transacoes)
            .ToListAsync();

        // Comparação case-insensitive: tipo é armazenado como "Receita" ou "Despesa".
        var resumoPessoas = pessoas.Select(p =>
        {
            var receitas = p.Transacoes
                .Where(t => t.Tipo.ToLower() == "receita")
                .Sum(t => t.Valor);

            var despesas = p.Transacoes
                .Where(t => t.Tipo.ToLower() == "despesa")
                .Sum(t => t.Valor);

            return new ResumoPessoaDTO
            {
                PessoaId = p.Id,
                Nome = p.Nome,
                TotalReceitas = receitas,
                TotalDespesas = despesas,
                Saldo = receitas - despesas
            };
        }).ToList();

        var totalReceitas = resumoPessoas.Sum(x => x.TotalReceitas);
        var totalDespesas = resumoPessoas.Sum(x => x.TotalDespesas);

        var resultado = new TotaisResponseDTO
        {
            Pessoas = resumoPessoas,
            TotalGeralReceitas = totalReceitas,
            TotalGeralDespesas = totalDespesas,
            SaldoGeral = totalReceitas - totalDespesas
        };

        return Ok(resultado);
    }
}