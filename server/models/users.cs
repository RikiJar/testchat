using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace server.models;
public class users{
    [Key]
    [Column ("id")]
    public int id {get; set;}

    [Column("username")]
    public string? username {get; set;}

    [Column("email")]
    public string? email {get; set;}
    
    [Column("password")]
    public string? password {get; set;}
}