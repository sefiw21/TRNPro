// src/
// └── features/
//     └── AdminDashboard/
//         ├── components/
//         │   ├── UsersTable.tsx         # The main table container
//         │   ├── UserTableRow.tsx       # A single row (handles its own state)
//         │   └── RoleSelect.tsx         # The dropdown UI for selecting a role
//         ├── hooks/
//         │   ├── useUsers.ts            # Fetches the user list from your Fastify API
//         │   └── useAssignRole.ts       # Sends the PUT request to change a role
//         ├── types/
//         │   └── index.ts               # TypeScript interfaces for this feature
//         └── AdminDashboard.tsx         # The main page that glues it all together

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
  updatedAt: string;
}
