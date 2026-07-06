namespace backend.DTOs;

public class TotaisResponseDTO
{
    public List<ResumoPessoaDTO> Pessoas { get; set; } = new();

    public decimal TotalGeralReceitas { get; set; }
    public decimal TotalGeralDespesas { get; set; }
    public decimal SaldoGeral { get; set; }
}