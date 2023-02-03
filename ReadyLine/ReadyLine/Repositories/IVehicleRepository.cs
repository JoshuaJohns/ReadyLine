using ReadyLine.Models;
using System.Collections.Generic;

namespace ReadyLine.Repositories
{
    public interface IVehicleRepository
    {
        List<Vehicle> GetAllVehicles();
        Vehicle GetById(int id);
    }
}
