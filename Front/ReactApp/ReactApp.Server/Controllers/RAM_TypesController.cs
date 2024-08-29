using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Duombaze;
using Duombaze.Models;
using Npgsql;

namespace Duombaze.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RAM_TypesController : Controller
    {
        private readonly AppDbContext _context;

        public RAM_TypesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: RAM_Types
        [HttpGet("list")]
        public async Task<IActionResult> Index()
        {
            return Ok(await _context.RAM_Types.ToListAsync());
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("id,name")] RAM_Types ram_Types)
        {
            if (ModelState.IsValid)
            {
                _context.Add(ram_Types);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(ram_Types);
        }

        // GET: RAM_Types/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var rAM_Types = await _context.RAM_Types.FindAsync(id);
            if (rAM_Types == null)
            {
                return NotFound();
            }
            return View(rAM_Types);
        }

        // POST: RAM_Types/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("id,name")] RAM_Types rAM_Types)
        {
            if (id != rAM_Types.id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(rAM_Types);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!RAM_TypesExists(rAM_Types.id))
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
            return View(rAM_Types);
        }

        // GET: RAM_Types/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var rAM_Types = await _context.RAM_Types
                .FirstOrDefaultAsync(m => m.id == id);
            if (rAM_Types == null)
            {
                return NotFound();
            }

            return View(rAM_Types);
        }

        // POST: RAM_Types/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var rAM_Types = await _context.RAM_Types.FindAsync(id);
            if (rAM_Types == null)
            {
                return NotFound();
            }

            if (!_context.Motherboard.Any(m => m.RAM_Type == id))
            {
                _context.RAM_Types.Remove(rAM_Types);
                await _context.SaveChangesAsync();
            }
            else
            {
                ModelState.AddModelError("", "Unable to delete. ");
                return View(rAM_Types);
            }
            return RedirectToAction(nameof(Index));
        }


        private bool RAM_TypesExists(int id)
        {
            return _context.RAM_Types.Any(e => e.id == id);
        }
    }
}
