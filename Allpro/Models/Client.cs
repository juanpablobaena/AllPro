namespace Allpro.Models
{
  public class InfoUser
  {
    public string UserId { get; set; }
    public string NameClient { get; set; }
    public string LastNameClient { get; set; }
    public string PhoneClient1 { get; set; }
    public string PhoneClient2 { get; set; }
    public string UserEmail { get; set; }
    public string UserName { get; set; }
    public string UserPassword { get; set; }
    public string ConfirmNewUserPassword { get; set; }
    public bool ChangePassword { get; set; }
    public string UserRole { get; set; }
  }
}