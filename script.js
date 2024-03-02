const loadPhone=async(searchText='a') =>{
    const res=await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data=await res.json();
    const phones=data.data;
    // console.log(phones);
    displayPhones(phones);   
};

const displayPhones=phones=>{
    //1.get full container
    const phoneContainer=document.getElementById("phone-container");
    //clear phone container before adding new phone
    phoneContainer.textContent='';
    const showBtn=document.getElementById("show-btn");
    if (phones.length > 12){
        showBtn.classList.remove("hidden");
        phones=phones.slice(0,12);
        document.getElementById("allMobile").addEventListener("click",function(){
            phones=phones.length;
        })
    }
    else if(phones.length <= 12){
        showBtn.classList.add("hidden");
    }
    
    phones.forEach(phone=>{

        // console.log(phone);
        //2.create a div 
        const phoneCard=document.createElement('div');
        phoneCard.classList=`card w-96 bg-gray-100 p-4 shadow-xl`;
        //set innerText
        phoneCard.innerHTML=`
        <figure><img src=${phone.image} alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}!</h2>
          <p>${phone.slug}</p>
          <div class="card-actions justify-center">
            <button onclick="showDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
          </div>
        </div>
        `;
        //append the phoneCard
        phoneContainer.appendChild(phoneCard);
    });
    toggle(false);
}
// loadPhone();

//handle search button
const handleSearch = (isShowAll)=>{
    toggle(true);
    const searchField=document.getElementById('search-field');
    let searchText=searchField.value;
    console.log(searchText);
    loadPhone(searchText);
    searchField.value="";
}
// const handleSearch2=()=>{
//     toggle(true);
//     const searchField1=document.getElementById('search-field1');
//     const searchText1=searchField1.value;
//     loadPhone(searchText1);
//     searchField1.value="";
// }
const toggle=(isLoading)=>{
    const loading=document.getElementById("loading");
    
    if(isLoading){
        loading.classList.remove("hidden");
    }
    else{
        loading.classList.add("hidden");
    }

}
const showDetails=async(id)=>{
    console.log(id);
    //load single data.
    const res=await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data=await res.json();
    const phone=data.data;
    console.log(phone);
    showPhoneDetails(phone);
}
const showPhoneDetails=(phone)=>{
    showAll.showModal();
    const phoneName=document.getElementById('phone-name');
    phoneName.innerText=phone.name;
    const showDetailContainer=document.getElementById("showDetailContainer");
    showDetailContainer.classList.add=`flex flex-col justify-center space-y-[20px]`;
    showDetailContainer.innerHTML=`
    <img src="${phone.image}" />
    <p><span class="font-bold">Brand:</span>${phone.brand}</p>
    <p><span class="font-bold">Storage:</span>${phone.mainFeatures?.storage}</p>
    <p><span class="font-bold">Chipset:</span> ${phone.mainFeatures.chipSet}</p>
    <p><span class="font-bold">DisplaySize
    :</span> ${phone.mainFeatures.displaySize
    }</p>
    <p><span class="font-bold">Memory:</span> ${phone.mainFeatures?.memory}</p>
    <p><span class="font-bold">Bluetooth:</span> ${phone.others?.GPS || "No Bluetooth"}</p>
    <p><span class="font-bold">GPS:</span> ${phone.others?.Bluetooth || "No GPS"}</p>
    <p><span class="font-bold">NFC:</span> ${phone.others?.NFC || "No NFC"}</p>
    <p><span class="font-bold">Radio:</span> ${phone.others?.Radio || "No Radio"}</p>
    <p><span class="font-bold">USB:</span> ${phone.others?.USB || "No USB"}</p>
    <p><span class="font-bold">WLAN:</span> ${phone.others?.WLAN || "No WLAN"}</p>
    <p><span class="font-bold">Release:</span> ${phone?.
        releaseDate
         || "No info"}</p>
    `
    console.log(phoneName);
}
loadPhone();