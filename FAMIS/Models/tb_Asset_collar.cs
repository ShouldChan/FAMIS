namespace FAMIS.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class tb_Asset_collar
    {
        public int ID { get; set; }

        [StringLength(20)]
        public string serial_number { get; set; }

        public DateTime? date { get; set; }

        public int? addree_Storage { get; set; }

        public bool? flag { get; set; }

        [Column("operator")]
        public int? _operator { get; set; }

        public DateTime? date_Operated { get; set; }
        public DateTime? date_review { get; set; }

        public int? state_List { get; set; }

        public int? department_collar { get; set; }

        [StringLength(200)]
        public string reason { get; set; }

        [StringLength(200)]
        public string ps { get; set; }

        [StringLength(200)]
        public string info_review { get; set; }

        public int? userID_reView { get; set; }

        public int? user_collar { get; set; }

    }
}
