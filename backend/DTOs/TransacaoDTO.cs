using System.ComponentModel.DataAnnotations;

public class TransacaoDTO
{
    [Required(ErrorMessage = "Descrição é obrigatória")]
    public string Descricao { get; set; } = string.Empty;

    [Range(0.01, double.MaxValue, ErrorMessage = "Valor deve ser maior que 0")]
    public decimal Valor { get; set; }

    [Required]
    public string Tipo { get; set; } = string.Empty;

    [Required]
    public int PessoaId { get; set; }
}