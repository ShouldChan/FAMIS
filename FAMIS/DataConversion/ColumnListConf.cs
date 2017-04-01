﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FAMIS.DataConversion
{
    public static class ColumnListConf
    {
        public static List<String> dto_Asset_Detail = new List<String>{"资产编号", "资产名称","资产类型", "资产型号", 
                                                                   "计量单位", "单价", "数量", "价值", "使用部门",
                                                                  "存放地址","资产状态","供应商","购买时间","操作时间",
                                                                  "服务年限","折旧方式","Net_residual_rate","月折旧",
                                                                   "总提折旧","净值","添加方式","减少方式"};
        public static List<String> dto_Asset_Summary = new List<String>{"资产名称","资产类型", "资产型号", 
                                                                   "计量单位",  "数量", "价值"};

        public static List<String> dto_Collar = new List<String>{"系统ID","单据号", "领用部门", 
                                                                   "存放地址",  "领用日期", "操作人员",
                                                                    "单据状态",  "操作日期", "领用人员","领用原因",  "备注"};

        public static List<String> dto_Repair = new List<String>{"系统ID","单据号", "送修日期", 
                                                                   "预计归还日期",  "送修原因", "维修商",
                                                                    "维修商地址",  "联系人", "申请人","授权人",  "备注",
                                                                        "单据状态",  "维修费用", "审核日期","登记人",  "审核人","登记日期"};

        public static List<String> dto_Borrow = new List<String>{"系统ID","单据号", "借出日期", 
                                                                   "预计归还日期",  "借用人", "借用部门",
                                                                    "登记用户",  "借用原因", "单据状态","登记日期"};
    }
}