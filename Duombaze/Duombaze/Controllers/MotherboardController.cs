using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Duombaze;
using Duombaze.Models;
using Duombaze.Models.ViewModels;

namespace Duombaze.Controllers
{
    public class MotherboardController : Controller
    {
        private readonly AppDbContext _context;

        public MotherboardController(AppDbContext context)
        {
            _context = context;
        }

        // GET: Motherboard
        public async Task<IActionResult> Index()
        {
            List<MotherboardModel> viewModels = await GetMotherboardViewModels();

            return View(viewModels);
        }

        // GET: Motherboard/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            List<MotherboardModel> viewModels = await GetMotherboardViewModels();
            var motherboard = viewModels
                .Select(viewModels => viewModels)
                .Where(m => m.Id == id)
                .FirstOrDefault();
            if (motherboard == null)
            {
                return NotFound();
            }

            return View(motherboard);
        }

        // GET: Motherboard/Create
        [HttpGet]
        public ActionResult Create()
        {
            var model = new MotherboardModel();
            PopulateLists(model);

            return View(model);
        }

        // POST: Motherboard/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        public ActionResult Create(MotherboardModel motherboard)
        {
            if (ModelState.IsValid)
            {
                Motherboard motherboard1 = new Motherboard
                {
                    Model = motherboard.Model,
                    RAM_Slots = motherboard.RAM_Slots,
                    RAM_Type = motherboard.RAM_TypeId,
                    Socket = motherboard.SocketId
                };
                _context.Motherboard.Add(motherboard1);
                _context.SaveChanges();

                return RedirectToAction("Index");
            }
            PopulateLists(motherboard);

            return View(motherboard);
        }

        // GET: Motherboard/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            List<MotherboardModel> viewModels = await GetMotherboardViewModels();
            var motherboard = viewModels
                .Select(viewModels => viewModels)
                .Where(m => m.Id == id)
                .FirstOrDefault();
            if (motherboard == null)
            {
                return NotFound();
            }
            return View(motherboard);
        }

        // POST: Motherboard/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, MotherboardModel motherboard)
        {
            if (id != motherboard.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    Motherboard oldMotherboard = _context.Motherboard.FirstOrDefault(m => m.Id == id);
                    oldMotherboard.Model = motherboard.Model;
                    oldMotherboard.RAM_Slots = motherboard.RAM_Slots;
                    oldMotherboard.RAM_Type = motherboard.RAM_TypeId;
                    oldMotherboard.Socket = motherboard.SocketId;
                    _context.Update(oldMotherboard);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!MotherboardExists(motherboard.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(motherboard);
        }

        // GET: Motherboard/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            List<MotherboardModel> viewModels = await GetMotherboardViewModels();
            var motherboard = viewModels
                .Select(viewModels => viewModels)
                .Where(m => m.Id == id)
                .FirstOrDefault();
            if (motherboard == null)
            {
                return NotFound();
            }

            return View(motherboard);
        }

        // POST: Motherboard/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var motherboard = await _context.Motherboard.FindAsync(id);
            if (motherboard != null)
            {
                _context.Motherboard.Remove(motherboard);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool MotherboardExists(int id)
        {
            return _context.Motherboard.Any(e => e.Id == id);
        }
        private async Task<List<MotherboardModel>> GetMotherboardViewModels()
        { 
            var socketTypes = _context.SocketTypes.ToList();
            var ramTypes = _context.RAM_Types.ToList();
            return await _context.Motherboard
                .Select(m => new MotherboardModel
                {
                    Id = m.Id,
                    Model = m.Model,
                    RAM_Slots = m.RAM_Slots,
                    Socket = _context.SocketTypes.FirstOrDefault(s => s.id == m.Socket).name,
                    RAM_Type = _context.RAM_Types.FirstOrDefault(r => r.id == m.RAM_Type).name,
                    RAM_TypesList = _context.RAM_Types.Select(r => new SelectListItem
                    {
                        Value = r.id.ToString(),
                        Text = r.name
                    }).ToList(),
                    SocketTypesList = _context.SocketTypes.Select(r => new SelectListItem
                    {
                        Value = r.id.ToString(),
                        Text = r.name
                    }).ToList(),
                    RAM_TypeId = m.RAM_Type,
                    SocketId = m.Socket
                })
                .ToListAsync();
        }
        private MotherboardModel GetMotherboardModel(Motherboard motherboard)
        {
            MotherboardModel viewModel = new MotherboardModel
            {
                Id = motherboard.Id,
                Model = motherboard.Model,
                RAM_Slots = motherboard.RAM_Slots,
                Socket = _context.SocketTypes.FirstOrDefault(s => s.id == motherboard.Socket).name,
                RAM_Type = _context.RAM_Types.FirstOrDefault(r => r.id == motherboard.RAM_Type).name,
                RAM_TypesList = _context.RAM_Types.Select(r => new SelectListItem
                {
                    Value = r.id.ToString(),
                    Text = r.name
                }).ToList(),
                SocketTypesList = _context.SocketTypes.Select(r => new SelectListItem
                {
                    Value = r.id.ToString(),
                    Text = r.name
                }).ToList(),
                RAM_TypeId = motherboard.RAM_Type,
                SocketId = motherboard.Socket
            };
            return viewModel;
        }
        private void PopulateLists(MotherboardModel model)
        {
            model.RAM_TypesList = _context.RAM_Types.Select(r => new SelectListItem
        {
            Value = r.id.ToString(),
            Text = r.name
        }).ToList();
        model.SocketTypesList = _context.SocketTypes.Select(s => new SelectListItem
        {
            Value = s.id.ToString(),
            Text = s.name
        }).ToList();
        }
    }
}
