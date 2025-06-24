using System;
using System.Collections.Generic;

namespace OnlyESBservice.Models
{
    public class AnalisisPedido
    {
        public string Id { get; set; }
        public string AnalisisId { get; set; }
        public string Nombre { get; set; } = null!;
        public decimal Precio { get; set; }
        public string Descripcion { get; set; } = null!;
    }

    public class Anticipo
    {
        public decimal Monto { get; set; }
        public DateTime FechaPago { get; set; }
        public string Estado { get; set; } = "pendiente"; // pendiente, pagado, rechazado
    }

    public class Pedido
    {
        public string Id { get; set; }
        public bool Status { get; set; } = true;
        public string UsuarioId { get; set; } = null!;
        public DateTime FechaCreacion { get; set; } = DateTime.UtcNow;
        public DateTime FechaActualizacion { get; set; } = DateTime.UtcNow;
        public string Estado { get; set; } = "pendiente"; // pendiente, pagado, cancelado
        public List<AnalisisPedido> Analisis { get; set; } = new List<AnalisisPedido>();
        public decimal Subtotal { get; set; }
        public decimal PorcentajeDescuento { get; set; } = 0;
        public decimal Total { get; set; }
        public string Notas { get; set; } = null!;
        public Anticipo Anticipo { get; set; } = new Anticipo();
    }
}