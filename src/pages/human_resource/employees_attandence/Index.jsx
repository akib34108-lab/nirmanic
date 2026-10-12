
import "./AttendanceTable.css";

const employees = [
  { id: "EMP-001", name: "Rahim Ahmed", department: "Engineering", project: "Site A - Residential Building", checkIn: "08:45 AM", checkOut: "05:10 PM", hours: "8h 25m", status: "Present", avatar: "https://i.pravatar.cc/100?img=12" },
  { id: "EMP-002", name: "Karim Hasan", department: "Construction", project: "Site B - Commercial Complex", checkIn: "09:20 AM", checkOut: "05:45 PM", hours: "8h 25m", status: "Late", avatar: "https://i.pravatar.cc/100?img=11" },
  { id: "EMP-003", name: "Nusrat Jahan", department: "Accounts", project: "Head Office", checkIn: "—", checkOut: "—", hours: "0h 0m", status: "Absent", avatar: "https://i.pravatar.cc/100?img=47" },
  { id: "EMP-004", name: "Sajib Mia", department: "Site Supervision", project: "Site A - Residential Building", checkIn: "08:10 AM", checkOut: "04:50 PM", hours: "8h 40m", status: "Present", avatar: "https://i.pravatar.cc/100?img=13" },
  { id: "EMP-005", name: "Fahim Ahmed", department: "Engineering", project: "Site C - Bridge Project", checkIn: "07:55 AM", checkOut: "03:30 PM", hours: "7h 35m", status: "Early Leave", avatar: "https://i.pravatar.cc/100?img=14" },
  { id: "EMP-006", name: "Tania Akter", department: "HR", project: "Head Office", checkIn: "09:00 AM", checkOut: "05:00 PM", hours: "8h 0m", status: "Present", avatar: "https://i.pravatar.cc/100?img=44" },
  { id: "EMP-007", name: "Rasel Khan", department: "Electrical", project: "Site B - Commercial Complex", checkIn: "08:30 AM", checkOut: "05:15 PM", hours: "8h 45m", status: "Present", avatar: "https://i.pravatar.cc/100?img=15" },
  { id: "EMP-008", name: "Shamim Hossain", department: "Materials", project: "Site A - Residential Building", checkIn: "09:45 AM", checkOut: "—", hours: "0h 0m", status: "Half Day", avatar: "https://i.pravatar.cc/100?img=60" },
  { id: "EMP-009", name: "Jannatul Ferdous", department: "Design", project: "Head Office", checkIn: "—", checkOut: "—", hours: "0h 0m", status: "On Leave", avatar: "https://i.pravatar.cc/100?img=49" },
  { id: "EMP-010", name: "Hasan Mahmud", department: "Equipment", project: "Site C - Bridge Project", checkIn: "08:25 AM", checkOut: "05:20 PM", hours: "8h 55m", status: "Present", avatar: "https://i.pravatar.cc/100?img=68" },
];

function AttendanceTable() {
  return (
    <div className="attendance-table-wrapper">
      <table className="attendance-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Employee</th>
            <th>Department</th>
            <th>Project / Site</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Working Hours</th>
            <th>Status</th>
            <th className="actions-heading">Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee.id}>
              <td>{index + 1}</td>

              <td>
                <div className="attendance-employee">
                  <img
                    src={employee.avatar}
                    alt={employee.name}
                    className="attendance-avatar"
                  />
                  <div className="attendance-employee-info">
                    <span className="employee-name">{employee.name}</span>
                    <span className="employee-id">{employee.id}</span>
                  </div>
                </div>
              </td>

              <td>{employee.department}</td>
              <td className="project-name">{employee.project}</td>
              <td>{employee.checkIn}</td>
              <td>{employee.checkOut}</td>
              <td>{employee.hours}</td>

              <td>
                <span
                  className={`attendance-status ${employee.status
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  <span className="status-dot"></span>
                  {employee.status}
                </span>
              </td>

              <td className="actions-cell">
                <button
                  type="button"
                  className="attendance-more-btn"
                  title="More actions"
                  onClick={() => alert(`Actions for ${employee.name}`)}
                >
                  <i className="mdi mdi-dots-vertical"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceTable;
