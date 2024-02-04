// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MangaPublication {
    address public owner;
    
    struct Manga {
        string title;
        address payable author;
        uint256 numChapters;
    }
    
    struct Chapter {
    string chapterTitle;
    uint256 price;
    bool isPublished;
    string[] contentURIs; // Array of URIs
    uint nextURIIndex; // Track the next available URI
    }

    struct UserChapter {
        uint256 mangaId;
        uint256 chapterId;
    }
    
    event MangaAdded(uint256 indexed mangaId, string title, address author);
    event ChapterAdded(uint256 indexed mangaId, uint256 indexed chapterId, string chapterTitle);
    event ChapterPurchased(address indexed buyer, uint256 indexed mangaId, uint256 indexed chapterId, string contentURI);
    
    mapping(address => mapping(uint256 => mapping(uint256 => uint))) public userChapterUriIndex;
    mapping(address => uint256[]) public authorMangas;
    mapping(address => UserChapter[]) public userLibrary;
    Manga[] public mangas;
    mapping(uint256 => Chapter[]) public chapters;
    mapping(address => mapping(uint256 => mapping(uint256 => bool))) public chapterOwnership;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    function createManga(string memory _title) public onlyOwner returns (uint256) {
        Manga memory newManga = Manga({
            title: _title,
            author: payable(msg.sender),
            numChapters: 0
        });
        uint256 mangaId = mangas.length;
        mangas.push(newManga);
        authorMangas[msg.sender].push(mangaId);
        emit MangaAdded(mangaId, _title, msg.sender);
        return mangaId;
    }

    function addChapter(uint256 _mangaId, string memory _chapterTitle, uint256 _price, string[] memory _contentURIs) public {
    require(msg.sender == mangas[_mangaId].author, "Only the author can add chapters");
    require(_contentURIs.length > 0, "At least one URI must be provided");

    Chapter memory newChapter = Chapter({
        chapterTitle: _chapterTitle,
        price: _price,
        isPublished: true,
        contentURIs: _contentURIs,
        nextURIIndex: 0 // Initialize index
    });
    chapters[_mangaId].push(newChapter);
    mangas[_mangaId].numChapters++;
    }

    function buyChapter(uint256 _mangaId, uint256 _chapterId) public payable {
    require(chapters[_mangaId][_chapterId].isPublished, "Chapter not published");
    require(msg.value == chapters[_mangaId][_chapterId].price, "Incorrect amount sent");
    require(!chapterOwnership[msg.sender][_mangaId][_chapterId], "Chapter already purchased");
    require(chapters[_mangaId][_chapterId].nextURIIndex < chapters[_mangaId][_chapterId].contentURIs.length, "No more URIs available");

    chapterOwnership[msg.sender][_mangaId][_chapterId] = true;
    userChapterUriIndex[msg.sender][_mangaId][_chapterId] = chapters[_mangaId][_chapterId].nextURIIndex;
    chapters[_mangaId][_chapterId].nextURIIndex++;

    // Handle the transfer of funds and any other necessary logic
    // Emit an event if necessary, including the assigned URI
    }

    function getChapter(uint256 _mangaId, uint256 _chapterId) public view returns (string memory) {
        require(chapterOwnership[msg.sender][_mangaId][_chapterId], "Not authorized to view this chapter");

        uint uriIndex = userChapterUriIndex[msg.sender][_mangaId][_chapterId];
        require(uriIndex < chapters[_mangaId][_chapterId].contentURIs.length, "URI index out of bounds");

        return chapters[_mangaId][_chapterId].contentURIs[uriIndex];
    }

    function getMangaCount() public view returns (uint256) {
        return mangas.length;
    }

    function getUserLibrary() public view returns (UserChapter[] memory) {
    return userLibrary[msg.sender];
    }

    function getAuthorMangas() public view returns (uint256[] memory) {
        return authorMangas[msg.sender];
    }
}
