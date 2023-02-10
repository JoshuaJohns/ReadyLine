using ReadyLine.Models;
using System.Collections.Generic;

namespace ReadyLine.Repositories
{
    public interface IVehicleRepository
    {
        List<Vehicle> GetAllVehicles();
        Vehicle GetById(int id);
        ClaimVehicle GetClaimById(int vehicleId, int userId);
        void Add(Vehicle vehicle);
        void AddClaim(ClaimVehicle claim);
        List<VehicleType> GetAllVehicleTypes();
        void DeleteVehicle(int id);
        void DeleteClaim(int id);
        void Update(Vehicle vehicle);

    }
}
