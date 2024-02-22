using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.models;
public class messages {
    [Key]
    [Column("messageID")]
    public int messageID {get; set;}

    [Column("message")]
    public string? message { get; set;}
    
    [Column("fk_userID")]
    public int fk_userID {get; set;}
}