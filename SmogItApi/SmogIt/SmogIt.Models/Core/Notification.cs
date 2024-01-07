using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmogIt.Models.Core
{
    public class Notification
    {
        public Notification( string message)
        {
            Message = message;
        }

        public string Message { get; }
    }
}
