const contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_mangaId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_chapterTitle",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			},
			{
				"internalType": "string[]",
				"name": "_contentURIs",
				"type": "string[]"
			}
		],
		"name": "addChapter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_mangaId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_chapterId",
				"type": "uint256"
			}
		],
		"name": "buyChapter",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "mangaId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "chapterId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "chapterTitle",
				"type": "string"
			}
		],
		"name": "ChapterAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "mangaId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "chapterId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "contentURI",
				"type": "string"
			}
		],
		"name": "ChapterPurchased",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_title",
				"type": "string"
			}
		],
		"name": "createManga",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "mangaId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "author",
				"type": "address"
			}
		],
		"name": "MangaAdded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "authorMangas",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "chapterOwnership",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "chapters",
		"outputs": [
			{
				"internalType": "string",
				"name": "chapterTitle",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isPublished",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "nextURIIndex",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAuthorMangas",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_mangaId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_chapterId",
				"type": "uint256"
			}
		],
		"name": "getChapter",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMangaCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getUserLibrary",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "mangaId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "chapterId",
						"type": "uint256"
					}
				],
				"internalType": "struct MangaPublication.UserChapter[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "mangas",
		"outputs": [
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "address payable",
				"name": "author",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "numChapters",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "userChapterUriIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "userLibrary",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "mangaId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "chapterId",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const contractAddress = '0x0E1A618ede7f191b268cAAFE075eE66B76024C79';

const web3 = new Web3('http://localhost:7545');
let contract;

window.onload = async function() {
    await initContract();
    loadMangas();
};

async function initContract() {
    contract = new web3.eth.Contract(contractABI, contractAddress);
}

async function loadMangas() {
    const mangaDisplay = document.getElementById('mangaDisplay');
    mangaDisplay.innerHTML = '';

    // Array of image filenames in your directory
    const imageFiles = ['mangas/manga1.jpg', 'mangas/manga2.jpg', 'mangas/manga3.jpg', 'mangas/manga4.jpg', 'mangas/manga5.jpg','mangas/manga6.jpg','mangas/manga7.jpg','mangas/manga8.jpg', 'mangas/manga9.jpg'];

    try {
        const mangaCount = await contract.methods.getMangaCount().call();
        for (let i = 0; i < mangaCount; i++) {
            const manga = await contract.methods.mangas(i).call();
            const col = document.createElement('div');
            col.className = 'col-md-4';

            const card = document.createElement('div');
            card.className = 'card';
            card.style.cursor = 'pointer';
            card.onclick = () => loadChapters(i);

            const img = document.createElement('img');
            img.className = 'card-img-top';
            
            // Select a random image from the array
            const randomIndex = Math.floor(Math.random() * imageFiles.length);
            img.src = imageFiles[randomIndex];
            
            img.alt = manga.title;

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            const cardTitle = document.createElement('h5');
            cardTitle.className = 'card-title';
            cardTitle.textContent = manga.title;

            cardBody.appendChild(cardTitle);
            card.appendChild(img);
            card.appendChild(cardBody);
            col.appendChild(card);
            mangaDisplay.appendChild(col);
        }
    } catch (error) {
        console.error('Error loading mangas:', error);
    }
}

async function loadChapters(mangaId) {
    const chapterDisplay = document.getElementById('chapterDisplay');
    chapterDisplay.innerHTML = '';
    chapterDisplay.style.display = 'block';

    try {
        const manga = await contract.methods.mangas(mangaId).call();
        for (let i = 0; i < manga.numChapters; i++) {
            const chapter = await contract.methods.chapters(mangaId, i).call();
            const chapterDiv = document.createElement('div');
            chapterDiv.className = 'd-flex align-items-center justify-content-between my-2';

            const chapterTitle = document.createElement('p');
            chapterTitle.className = 'mb-0 large-font';
            chapterTitle.textContent = chapter.chapterTitle;

            const buyButton = document.createElement('button');
            buyButton.className = 'btn btn-primary large-font';
            buyButton.textContent = 'Buy this Chapter';
            buyButton.onclick = () => purchaseChapter(mangaId, i, chapter.price);

            chapterDiv.appendChild(chapterTitle);
            chapterDiv.appendChild(buyButton);
            chapterDisplay.appendChild(chapterDiv);
        }
    } catch (error) {
        console.error('Error loading chapters:', error);
    }
}

async function purchaseChapter(mangaId, chapterId, price) {
    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.buyChapter(mangaId, chapterId).send({ from: accounts[0], value: price, gas: 1000000 });
        alert('Chapter purchased successfully!');
    } catch (error) {
        console.error('Error purchasing chapter:', error);
    }
}

async function getChapterContent(mangaId, chapterId) {
    try {
        const accounts = await web3.eth.getAccounts();
        const contentURI = await contract.methods.getChapter(mangaId, chapterId).call({from: accounts[0]});
        alert(`Chapter content URI: ${contentURI}`);
    } catch (error) {
        console.error('Error getting chapter content:', error);
    }
}


async function loadUserLibrary() {
    const libraryDisplay = document.getElementById('libraryDisplay');
    libraryDisplay.innerHTML = '';
    libraryDisplay.style.display = 'block';

    const uniqueMangaIds = new Set();
    const purchasedChapters = new Map();

    // Array of image filenames in your directory
    const imageFiles = ['mangas/manga1.jpg', 'mangas/manga2.jpg', 'mangas/manga3.jpg', 'mangas/manga4.jpg', 'mangas/manga5.jpg','mangas/manga6.jpg','mangas/manga7.jpg','mangas/manga8.jpg', 'mangas/manga9.jpg'];

    try {
        const accounts = await web3.eth.getAccounts();
        const userChapters = await contract.methods.getUserLibrary().call({from: accounts[0]});

        for (const userChapter of userChapters) {
            uniqueMangaIds.add(userChapter.mangaId);
            if (!purchasedChapters.has(userChapter.mangaId)) {
                purchasedChapters.set(userChapter.mangaId, []);
            }
            purchasedChapters.get(userChapter.mangaId).push(userChapter.chapterId);
        }

        for (const mangaId of uniqueMangaIds) {
            const manga = await contract.methods.mangas(mangaId).call();
            
            const col = document.createElement('div');
            col.className = 'col-md-4';

            const card = document.createElement('div');
            card.className = 'card';
            card.style.cursor = 'pointer';
            card.onclick = () => loadPurchasedChapters(mangaId, purchasedChapters.get(mangaId));

            const img = document.createElement('img');
            img.className = 'card-img-top';

            // Select a random image from the array
            const randomIndex = Math.floor(Math.random() * imageFiles.length);
            img.src = imageFiles[randomIndex];

            img.alt = manga.title;

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            const cardTitle = document.createElement('h5');
            cardTitle.className = 'card-title';
            cardTitle.textContent = manga.title;

            cardBody.appendChild(cardTitle);
            card.appendChild(img);
            card.appendChild(cardBody);
            col.appendChild(card);
            libraryDisplay.appendChild(col);
        }
    } catch (error) {
        console.error('Error loading user library:', error);
    }
}

async function loadPurchasedChapters(mangaId, chapterIds) {
    const chapterDisplay = document.getElementById('chapterDisplay');
    chapterDisplay.innerHTML = '';
    chapterDisplay.style.display = 'block';

    try {
        for (const chapterId of chapterIds) {
            const chapter = await contract.methods.chapters(mangaId, chapterId).call();

            const chapterDiv = document.createElement('div');
            chapterDiv.className = 'd-flex align-items-center justify-content-between my-2';

            const chapterTitle = document.createElement('p');
            chapterTitle.className = 'mb-0 large-font';
            chapterTitle.textContent = chapter.chapterTitle;

            const viewButton = document.createElement('button');
            viewButton.className = 'btn btn-secondary large-font';
            viewButton.textContent = 'View Chapter';
            viewButton.onclick = () => getChapterContent(mangaId, chapterId);

            chapterDiv.appendChild(chapterTitle);
            chapterDiv.appendChild(viewButton);
            chapterDisplay.appendChild(chapterDiv);
        }
    } catch (error) {
        console.error('Error loading purchased chapters:', error);
    }
}


