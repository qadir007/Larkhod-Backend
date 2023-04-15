const allRoles = {
  student: [],
  admin: ["canAnnounceResult", "canAcceptProposal", "canRejectProposal"],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

export { roles, roleRights };
