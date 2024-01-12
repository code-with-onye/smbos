import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { MainNav } from "./components/admin-nav";
import { CreateCategoryCard } from "./components/create-category-card";
import { ThemeSwitcher } from "@/components/shared/theme-switcher";

import {
  getCategories,
  getCategoryByUserId,
  getRecentCategoriesByUserId,
} from "@/lib/server-actions/category";
import { CreatedCategory } from "./components/created-category";
import { CreateService } from "./components/create-service";
import { getRecentlyCreatedServicesByUserId } from "@/lib/server-actions/services";
import { CreatedService } from "./components/created-service";

const AdminPage = async () => {
  const session = await auth();

  const categories = await getCategoryByUserId(session?.user.id as string);
  const recentCreatedCategories = await getRecentCategoriesByUserId(
    session?.user.id as string
  );
  const recentCreatedServices = await getRecentlyCreatedServicesByUserId(
    session?.user.id as string
  );

  return (
    <div className="w-full px-4">
      <div className="w-full flex items-center">
        <div className="w-full min-h-[84vh] bg-white dark:bg-[#272E38] rounded-lg p-4 justify-center items-center">
          {/* side 1 */}
          <h3 className="text-3xl font-bold">Dashboard </h3>

          <div>
            {/* Categories gose here */}
            {categories?.length === 0 ? (
              <div className="w-full rounded-2xl border dark:border-slate-800 bg-white dark:bg-black px-4 py-20 my-4 shadow-sm flex flex-col items-center gap-y-3">
                <p className="text-sm ">
                  Start by Adding your first cartegory. Example is SkinCare{" "}
                </p>
                <CreateCategoryCard
                  buttonType={
                    <Button className="w-full"> Create Category</Button>
                  }
                />
              </div>
            ) : (
              <CreatedCategory categories={recentCreatedCategories as any} />
            )}
          </div>

          {categories?.length !== 0 && (
            <div>

              {/* Service gose here */}

              <div className="flex items-center w-full justify-between">
                <h3 className="text-lg font-semibold">Recently Created Services</h3>
                <CreateService
                buttonType={<div className="w-full"> 
                  <p className="text-xs font-semibold">Add New Service</p>
                </div>}
                categories={recentCreatedCategories as any}
              />
              </div>
              {recentCreatedServices?.length === 0 ? (
                <div className="w-full rounded-2xl border dark:border-slate-800 bg-white dark:bg-black px-4 py-20 my-4 shadow-sm flex flex-col items-center gap-y-3">
                  <p className="text-sm ">
                    Start by creating your first service. Example is Hair Care
                  </p>
                  <CreateService
                    buttonType={
                      <Button className="w-full"> Create Service</Button>
                    }
                    categories={recentCreatedCategories as any}
                  />
                </div>
              ) : (
                <CreatedService services={recentCreatedServices as any} />
              )}

            
            </div>
          )}
        </div>

        <div className="w-full">
          {/* side 2 */}
          mobile view
        </div>
      </div>

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

export default AdminPage;
