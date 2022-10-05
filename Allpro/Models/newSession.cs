namespace Allpro.Models
{
  public class userLogin
  {
    public string UserName { get; set; }
    public string Password { get; set; }
  }

  public class newSession
  {
    public bool ValideUser { get; set; }
    public bool IsAdministrator { get; set; }
    public string UserId { get; set; }
    public string UserName { get; set; }
  }
}