namespace Allpro.Models
{
  public class Client : MasterAllpro
  {
    public string UserName { get; set; }
    public string UserPassword { get; set; }
    public string PhoneClient1 { get; set; }
    public string PhoneClient2 { get; set; }
    public string DocumentClient { get; set; }
    public string NameClient { get; set; }
    public string LastNameClient { get; set; }
    public string Email { get; set; }
    public string RoleID { get; set; }
  }

  public class Response
  {
    public bool valideUser { get; set; }
    public bool isAdministrator { get; set; }
  }
}