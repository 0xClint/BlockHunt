// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract JobNFT is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    constructor() ERC721("JobNFT", "JOB") Ownable(msg.sender) {}

    function mintJob(string memory jobURI) public returns (uint256 tokenId) {
        tokenId = _nextTokenId++;
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, jobURI);
    }
    
    function getJobURI(uint256 tokenId) public view returns (string memory) {
        return tokenURI(tokenId);
    }
}

contract JobApplicants is JobNFT {
    struct Applicant {
        address applicantAddress;
        string resumeCID;
    }

    mapping(uint256 => Applicant[]) public jobApplicants;
    mapping(uint256 => address) public jobResult;

    function applyToJob(uint256 jobTokenId, string memory resumeCID) public {
        require(ownerOf(jobTokenId) != address(0), "Job does not exist");

        Applicant memory newApplicant = Applicant({
            applicantAddress: msg.sender,
            resumeCID: resumeCID
        });

        jobApplicants[jobTokenId].push(newApplicant);
    }

    function getJobApplicants(uint256 jobTokenId) public view returns (Applicant[] memory) {
        return jobApplicants[jobTokenId];
    }

    function decideResult(uint256 jobTokenId, address selectedApplicant) public {
        require(ownerOf(jobTokenId) == msg.sender, "Only job owner can select");
        require(jobResult[jobTokenId] == address(0), "Result already declared");

        jobResult[jobTokenId] = selectedApplicant;
    }

    function getJobResult(uint256 jobTokenId) public view returns (address) {
        return jobResult[jobTokenId];
    }
}