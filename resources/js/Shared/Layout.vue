<template>
  
   <div id="app" class="bg-gradient-to-b from-sky-400 to-sky-700 
                        text-white w-full min-h-screen">
        <header>     
            <nav class="bg-gray-800 text-white py-4 px-8 flex justify-between">
                <ul class="main-nav">
                    <li>Lara Todos</li>
                </ul>
                <div class="flex gap-4">
                    <Link href="#">Register</Link>
                    <Link href="#">Login</Link>
                </div>          
            </nav> 
        </header>
    <main >
    
        <slot></slot>
    </main>

   </div> 


</template>

