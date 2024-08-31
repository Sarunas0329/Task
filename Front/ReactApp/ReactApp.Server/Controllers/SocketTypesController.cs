using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Duombaze;
using Duombaze.Models;

namespace Duombaze.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SocketTypesController : Controller
    {
        private readonly AppDbContext _context;

        public SocketTypesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: SocketTypes
        [HttpGet("list")]
        public async Task<IActionResult> Index()
        {
            Console.WriteLine("yra");
            return Ok(await _context.SocketTypes.ToListAsync());
        }

        // GET: SocketTypes/Details/5
        [HttpGet("{id}/details")]
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var socketTypes = await _context.SocketTypes
                .FirstOrDefaultAsync(m => m.id == id);
            if (socketTypes == null)
            {
                return NotFound();
            }

            return Ok(socketTypes);
        }

        // GET: SocketTypes/Create
        [HttpGet("create")]
        public IActionResult Create()
        {
            return Ok();
        }

        // POST: SocketTypes/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost("create")]
        public async Task<IActionResult> Create([Bind("id,name")] SocketTypes socketTypes)
        {
            if (ModelState.IsValid)
            {
                if (_context.SocketTypes.Any(e => e.name == socketTypes.name))
                {
                    ModelState.AddModelError("", "Unable to save changes. Socket Type already exists.");
                    return StatusCode(501);
                }
                _context.Add(socketTypes);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return Ok(socketTypes);
        }

        [HttpGet("{id}/edit")]
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var socketTypes = await _context.SocketTypes.FindAsync(id);
            if (socketTypes == null)
            {
                return NotFound();
            }
            return Ok(socketTypes);
        }

        [HttpPost("{id}/edit")]
        public async Task<IActionResult> Edit(int id, [Bind("id,name")] SocketTypes socketTypes)
        {
            Console.WriteLine(id);
            Console.WriteLine(socketTypes.id);
            if (id != socketTypes.id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                if (_context.SocketTypes.Any(e => e.name == socketTypes.name))
                {
                    ModelState.AddModelError("", "Unable to save changes. Socket Type already exists.");
                    return StatusCode(501);
                }
                try
                {
                    _context.Update(socketTypes);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!SocketTypesExists(socketTypes.id))
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
            return Ok(socketTypes);
        }

        // GET: SocketTypes/Delete/5
        [HttpGet("{id}/delete")]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var socketTypes = await _context.SocketTypes
                .FirstOrDefaultAsync(m => m.id == id);
            if (socketTypes == null)
            {
                return NotFound();
            }

            return View(socketTypes);
        }

        // POST: SocketTypes/Delete/5
        [HttpPost("{id}/delete")]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var socketType = await _context.SocketTypes.FindAsync(id);
            if (!_context.Motherboard.Any(m => m.Socket == id))
            {
                _context.SocketTypes.Remove(socketType);
                await _context.SaveChangesAsync();
            }
            else
            {
                ModelState.AddModelError("", "Unable to delete. ");
                return View(socketType);
            }
            return RedirectToAction(nameof(Index));
        }

        private bool SocketTypesExists(int id)
        {
            return _context.SocketTypes.Any(e => e.id == id);
        }
    }
}
