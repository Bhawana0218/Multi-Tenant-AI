
export function canAccessProject(user: any, projectId : String){
    return user.projectRoles.some((role: any)=>
         role.projectId?.toString() === projectId.toString()
 );
}

export function isAdmin(user: any, projectId: String){
    return user.projectRoles?.some(
        (role: any)=>
             role.projetId?.toString() === projectId.toString()
        && role.role === 'admin'
    );
}

export function getUserRole(user: any, projectId: string) {
  return user.projectRoles?.find(
    (role: any) => role.projectId.toString() === projectId.toString()
  )?.role;
}