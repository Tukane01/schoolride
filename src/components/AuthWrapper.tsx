
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Logo } from "@/components/Logo";
import LoginForm from "@/components/LoginForm";
import RegisterOptions from "@/components/RegisterOptions";
import ParentRegisterForm from "@/components/ParentRegisterForm";
import DriverRegisterForm from "@/components/DriverRegisterForm";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const AuthWrapper: React.FC = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [registerType, setRegisterType] = useState<"select" | "parent" | "driver">("select");
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleRegisterTypeSelect = (type: "parent" | "driver") => {
    setRegisterType(type);
  };

  const handleBackToOptions = () => {
    setRegisterType("select");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin h-10 w-10 border-4 border-schoolride-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null; // We're redirecting in useEffect
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-schoolride-background p-4">
      <Card className="w-full max-w-md shadow-lg animate-fade-in">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <Logo className="h-20 mb-4" />
          <CardTitle className="text-2xl text-center font-heading font-bold text-schoolride-primary">Ride2School</CardTitle>
          <CardDescription className="text-center text-base">
            Safe transportation for your children
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-8">
              <TabsTrigger value="login" className="text-base py-2">Login</TabsTrigger>
              <TabsTrigger value="register" className="text-base py-2">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <LoginForm />
            </TabsContent>

            <TabsContent value="register">
              {registerType === "select" && (
                <RegisterOptions onSelect={handleRegisterTypeSelect} />
              )}
              
              {registerType === "parent" && (
                <>
                  <ParentRegisterForm />
                  <Button
                    variant="outline"
                    onClick={handleBackToOptions}
                    className="w-full mt-4 text-schoolride-primary border-schoolride-primary hover:bg-schoolride-primary/5"
                  >
                    Back to options
                  </Button>
                </>
              )}
              
              {registerType === "driver" && (
                <>
                  <DriverRegisterForm />
                  <Button
                    variant="outline"
                    onClick={handleBackToOptions}
                    className="w-full mt-4 text-schoolride-primary border-schoolride-primary hover:bg-schoolride-primary/5"
                  >
                    Back to options
                  </Button>
                </>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <small className="text-muted-foreground text-center text-sm">
            &copy; {new Date().getFullYear()} Ride2School. All rights reserved.
          </small>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthWrapper;
