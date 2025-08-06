namespace Server.Validations;

public class ValidationResult
{
    public bool IsValid => !Errors.Any();
    public List<string> Errors { get; } = new List<string>();

    public void AddErrors(string? error)
    {
        if(error != null)
        {
            Errors.Add(error);
        }
    }
}