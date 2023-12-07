using System;
using Mpt.Domain.PickupAndDeliveryTasks;
using Mpt.Domain.Shared;
using Mpt.Domain.SystemUsers;

namespace Mpt.Domain.PickupAndDeliveryTasks
{
    public class PickupAndDeliveryTaskDTO
    {
        public Guid Id { get; set; }
        public string PickupPlace { get; set; }
        public string DeliveryPlace { get; set; }
        public string PickupPersonName { get; set; }
        public string PickupPersonPhoneNumber { get; set; }
        public string DeliveryPersonName { get; set; }
        public string DeliveryPersonPhoneNumber { get; set; }
        public string Description { get; set; }
        public string ConfirmationCode { get; set; }
        public TasksStatus Status { get; set; }
        public SystemUser User { get; set; }

        public PickupAndDeliveryTaskDTO(Guid Id, string pickupPlace, string deliveryPlace, string pickupPersonName,
            string pickupPersonPhoneNumber,
            string deliveryPersonName,
            string deliveryPersonPhoneNumber,
            string description,
            string confirmationCode,
            TasksStatus status,
            SystemUser user)
        {
            this.Id = Id;
            this.PickupPlace = pickupPlace;
            this.DeliveryPlace = deliveryPlace;
            this.PickupPersonName = pickupPersonName;
            this.PickupPersonPhoneNumber = pickupPersonPhoneNumber;
            this.DeliveryPersonName = deliveryPersonName;
            this.DeliveryPersonPhoneNumber = deliveryPersonPhoneNumber;
            this.Description = description;
            this.ConfirmationCode = confirmationCode;
            this.Status = status;
            this.User = user;
        }
    }
}