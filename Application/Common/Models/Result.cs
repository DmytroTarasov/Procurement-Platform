namespace Application.Common.Models
{
    public class Result<T>
    {
        public bool IsSuccess { get; set; }
        public T Value { get; set; }
        public string Error { get; set; }
        public bool IsForbidden { get; set; }
        public IDictionary<string, string[]> ValidationErrors { get; set; }
        public static Result<T> Success(T value) => 
            new Result<T> { IsSuccess = true, Value = value };
        public static Result<T> Failure(string error) => 
            new Result<T> { IsSuccess = false, Error = error };
        public static Result<T> ValidationFailure(IDictionary<string, string[]> validationErrors) => 
            new Result<T> { IsSuccess = false, ValidationErrors = validationErrors };
        public static Result<T> Forbidden(string error) => 
            new Result<T> { IsSuccess = false, Error = error, IsForbidden = true };
    }
}
