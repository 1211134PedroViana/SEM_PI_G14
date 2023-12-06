using System;

namespace Mpt.Domain.Role
{
    public class CreateRoleDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }

        public RoleDTO(string name, string description)
        {
            this.Name = name;
            this.Description = description;
        }
    }
}