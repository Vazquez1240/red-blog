"use client";
import ComponentLoginRegister from "@/components/ComponentsIndexPage/ComponentLoginRegister";
import ComponentFeed from "@/components/ComponentsIndexPage/ComponentFeed";
import DefaultLayout from "@/layouts/default";
import { useAuth } from "@/context/AuthContext";

export default function IndexPage() {
  const { user } = useAuth();

  return (
    <DefaultLayout>
      <main className="w-full h-full">
        {user !== undefined ? (
          <ComponentFeed />
        ) : (
          <ComponentLoginRegister />
        )}
      </main>
    </DefaultLayout>
  );
}
