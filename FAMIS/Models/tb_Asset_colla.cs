namespace FAMIS.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class tb_Asset_colla
    {
        public int ID { get; set; }

        [StringLength(20)]
        public string serial_number { get; set; }

        public DateTime? date { get; set; }

        public int? person { get; set; }

        public int? addree_Storage { get; set; }

        public bool? flag { get; set; }

        public int? person_Operator { get; set; }

        public DateTime? date_Operated { get; set; }

        public int? state_List { get; set; }
    }
}
