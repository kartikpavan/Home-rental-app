const CreateListingPage = () => {
   return (
      <main className="px-3 md:container mx-auto pt-20">
         <h1 className=" py-10 text-3xl font-semibold text-primary-content">List your Place</h1>
         <section className="bg-white p-10 rounded-md">
            <div>
               <h1 className="text-xl font-semibold text-secondary">
                  Step 1: Tell us about your place
               </h1>
               <div className="divider"></div>
               <h2 className="font-semibold text-lg text-primary-content">
                  Which of these categories best describe your place ?
               </h2>
            </div>
         </section>
      </main>
   );
};

export default CreateListingPage;
