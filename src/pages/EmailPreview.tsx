import { PackInvitationEmailPreview } from "@/components/emails/PackInvitationEmail";
import { PackInvitationEmailModernPreview } from "@/components/emails/PackInvitationEmailModern";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EmailPreview = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 mt-8">Diseños de Email</h1>
        <Tabs defaultValue="modern" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="modern">Diseño Moderno</TabsTrigger>
            <TabsTrigger value="classic">Diseño Clásico</TabsTrigger>
          </TabsList>
          <TabsContent value="modern">
            <PackInvitationEmailModernPreview />
          </TabsContent>
          <TabsContent value="classic">
            <PackInvitationEmailPreview />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmailPreview;
