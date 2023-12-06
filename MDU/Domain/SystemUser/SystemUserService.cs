using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Mpt.Domain.Shared;

namespace Mpt.Domain.SystemUsers
{
    public class SystemUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ISystemUserRepository _repo;

        public SystemUserService(IUnitOfWork unitOfWork, ISystemUserRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<List<SystemUserDTO>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            List<SystemUserDTO> listDto = list.ConvertAll<SystemUserDto>(user =>
                new SystemUserDTO(user.Id.AsGuid(), user.Email, user.Role, user.Active, user.PhoneNumber, user.Contribuinte));

            return listDto;
        }

        public async Task<SystemUserDto> GetByIdAsync(SystemUserId id)
        {
            var user = await this._repo.GetByIdAsync(id);

            if(user == null)
                return null;

            return new SystemUserDto(user.Id.AsGuid(), user.Email, user.Role, user.Active, user.PhoneNumber, user.Contribuinte);
        }

        public async Task<SystemUserDto> AddAsync(CreatingSystemUserDto dto)
        {
            var user = new SystemUser(dto.Email, dto.Password, dto.Role, dto.PhoneNumber, dto.Contribuinte);

            await this._repo.AddAsync(user);
            await this._unitOfWork.CommitAsync();

            return new SystemUserDto(user.Id.AsGuid(), user.Email, user.Role, user.Active, user.PhoneNumber, user.Contribuinte);
        }

        public async Task<SystemUserDto> UpdateAsync(SystemUserDto dto)
        {
            var user = await this._repo.GetByIdAsync(new SystemUserId(dto.Id));

            if (user == null)
                return null;

            // change all fields
            user.ChangePassword(dto.Password);
            user.ChangePhoneNumber(dto.PhoneNumber);
            user.ChangeContribuinte(dto.Contribuinte);

            await this._unitOfWork.CommitAsync();

            return new SystemUserDto(user.Id.AsGuid(), user.Email, user.Role, user.Active, user.PhoneNumber, user.Contribuinte);
        }

        public async Task<SystemUserDto> DeactivateAsync(SystemUserId id)
        {
            var user = await this._repo.GetByIdAsync(id);

            if (user == null)
                return null;

            user.Deactivate();

            await this._unitOfWork.CommitAsync();

            return new SystemUserDto(user.Id.AsGuid(), user.Email, user.Role, user.Active, user.PhoneNumber, user.Contribuinte);
        }

        public async Task<SystemUserDto> DeleteAsync(SystemUserId id)
        {
            var user = await this._repo.GetByIdAsync(id);

            if (user == null)
                return null;

            this._repo.Remove(user);
            await this._unitOfWork.CommitAsync();

            return new SystemUserDto(user.Id.AsGuid(), user.Email, user.Role, user.Active, user.PhoneNumber, user.Contribuinte);
        }
    }
}
