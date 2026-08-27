import { rolesWithDefaultStudent } from "../../shared/identityRoles";

export default {
  userSignup(event: { user: { appMetadata?: Record<string, unknown> } }) {
    return {
      user: {
        ...event.user,
        appMetadata: {
          ...event.user.appMetadata,
          roles: rolesWithDefaultStudent(event.user.appMetadata?.roles),
        },
      },
    };
  },
};
