import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";


const OrganizationPage =  () => {

  
  
  return (
    <div className="w-full px-4">

      {/* {JSON.stringify(session?.user.accessToken)} */}

      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button variant="ghost">Log Out</Button>
      </form>
    </div>
  );
};

export default OrganizationPage;
