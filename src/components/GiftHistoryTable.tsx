import { giftHistory } from "../data/giftHistoryData";
import type { GiftHistoryItem } from "../types/types";

export default function GiftHistoryTable() {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Completed":
        return "text-green-600 bg-green-100";
      case "Sending":
        return "text-orange-600 bg-orange-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getTagStyle = (tag: string) => {
    switch (tag) {
      case "Food":
        return "bg-green-100 text-green-700";
      case "Fashion":
        return "bg-purple-100 text-purple-700";
      case "Health":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Gift History</h2>
        <button className="text-sm text-primary hover:underline">See All</button>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-500 text-left bg-[#F7F8F9]">
            <th className="p-2">Receiver</th>
            <th>Gift Name</th>
            <th>Tags</th>
            <th>Date Sent</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {giftHistory.map((item: GiftHistoryItem) => (
            <tr key={item.id} className="border-b border-[#F1F2F3] last:border-t last:border-b-0">
              <td className="py-4 flex items-center gap-3">
                <img
                  src={item.receiver.avatar}
                  alt={item.receiver.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{item.receiver.name}</p>
                  <p className="text-xs text-gray-500">{item.receiver.type}</p>
                </div>
              </td>
              <td className="py-4">{item.giftName}</td>
              <td className="py-4 flex gap-1">
                {item.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className={`text-xs px-2 py-1 rounded-full ${getTagStyle(tag)}`}
                  >
                    {tag}
                  </span>
                ))}
              </td>
              <td className="py-4">{new Date(item.dateSent).toLocaleDateString("en-GB")}</td>
              <td className="py-4">
                <span
                  className={`text-xs px-2 py-1 rounded-md font-medium ${getStatusStyle(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

