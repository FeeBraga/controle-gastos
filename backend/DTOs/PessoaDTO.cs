using System.ComponentModel.DataAnnotations;

public class PessoaDTO
{
    [Required(ErrorMessage = "Nome é obrigatório")]
    public string Nome { get; set; } = string.Empty;

    [Range(0, 120, ErrorMessage = "Idade deve ser entre 0 e 120")]
    public int Idade { get; set; }
}