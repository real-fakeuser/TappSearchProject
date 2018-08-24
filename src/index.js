import './components/siteconstructor/insert';

    let listLength = 30;
    let listentries = 0;
    let lastSearch = "Tobit";
    let lastInputTime = 0;
    let newListLength = 20;
    let listTemplate = `
                        <div class="ListItem ListItem--clickable" id="$siteId">
                            <div class="listLinks" id="$siteId">
                                <div class="ListItem__head">
                                    <div style="background:url(https://sub60.tobit.com/l/$locationId)" class="ListItem__Image"> 
                                    </div>  
                                    <div class="ListItem__Title"> 
                                        <p class="ListItem__Title--headline">$Name</p> 
                                        <p class="ListItem__Title--description">$siteId</p>   
                                    </div> 
                                </div>  
                            </div>
                        </div>`;





const init = async () => {
    await chayns.ready;
    console.log("hello world!");

  

};

init();
