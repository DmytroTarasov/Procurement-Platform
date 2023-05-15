namespace Application.Common.Helpers
{
    public class Result<T>
    {
        public bool IsSuccess { get; set; }
        public T Value { get; set; }
        public string Error { get; set; }
        public bool IsForbidden { get; set; }
        public static Result<T> Success(T value) => 
            new Result<T> { IsSuccess = true, Value = value };
        public static Result<T> Failure(string error) => 
            new Result<T> { IsSuccess = false, Error = error };
        public static Result<T> Forbidden() => 
            new Result<T> { IsSuccess = false, IsForbidden = true };
    }
}
