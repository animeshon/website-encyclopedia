export const Status = (type) => {
    // TODO internationalization
   switch (type) {
    case "CANCELED":
        return "Canceled";
    case "COMPLETED":
        return "Completed";
    case "INTERRUPTED":
        return "Interrupted";
    case "ONGOING":
        return "Ongoing";
    case "SCHEDULED":
        return "Scheduled";
    case "SUSPENDED":
        return "Suspended";
    case "WORK_IN_PROGRESS":
        return "Work In Progress";
   }
   return undefined;
}