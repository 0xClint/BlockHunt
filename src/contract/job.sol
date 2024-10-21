// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

error OnlyOwnerCanUpdateURI(uint256 tokenId);
error JobDoesNotExist(uint256 tokenId);
error AlreadyApplied(uint256 jobTokenId, address applicant);
error OnlyJobOwnerCanSelect(uint256 jobTokenId);
error ResultAlreadyDeclared(uint256 jobTokenId);

contract JobNFT is ERC721URIStorage, Ownable {
    uint256 internal _nextTokenId;

    constructor() ERC721("JobNFT", "JOB") Ownable(msg.sender) {}

    function mintJob(string memory jobURI) public returns (uint256 tokenId) {
        tokenId = _nextTokenId++;
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, jobURI);
    }

    function updateJobURI(uint256 tokenId, string memory jobURI) public {
        if (ownerOf(tokenId) != msg.sender) {
            revert OnlyOwnerCanUpdateURI(tokenId);
        }
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

    struct Application {
        uint256 jobTokenId;   
        Applicant applicant;
    }

    mapping(uint256 => Applicant[]) public jobApplicants;
    mapping(uint256 => address[]) public jobResult;
    mapping(uint256 => mapping(address => bool)) public applied;

    function applyToJob(uint256 jobTokenId, string memory resumeCID) public {
        if (ownerOf(jobTokenId) == address(0)) {
            revert JobDoesNotExist(jobTokenId);
        }
        if (applied[jobTokenId][msg.sender]) {
            revert AlreadyApplied(jobTokenId, msg.sender);
        }

        Applicant memory newApplicant = Applicant({
            applicantAddress: msg.sender,
            resumeCID: resumeCID
        });

        jobApplicants[jobTokenId].push(newApplicant);
        applied[jobTokenId][msg.sender] = true;
    }

    function getMyApplications() public view returns (uint256[] memory jobIds, string[] memory resumeURIs, string[] memory jobURIs) {
        uint256 count;
        
        for (uint256 i = 0; i < _nextTokenId; i++) {
            if (applied[i][msg.sender]) count++;
        }

        jobIds = new uint256[](count);
        resumeURIs = new string[](count);
        jobURIs = new string[](count);
        uint256 index = 0;

        for (uint256 i = 0; i < _nextTokenId; i++) {
            if (applied[i][msg.sender]) {
                for (uint256 j = 0; j < jobApplicants[i].length; j++) {
                    if (jobApplicants[i][j].applicantAddress == msg.sender) {
                        jobIds[index] = i;                             
                        resumeURIs[index] = jobApplicants[i][j].resumeCID;
                        jobURIs[index] = tokenURI(i);                 
                        index++;
                    }
                }
            }
        }

        return (jobIds, resumeURIs, jobURIs);
    }

    function getJobApplicants(uint256 jobTokenId) public view returns (Applicant[] memory) {
        return jobApplicants[jobTokenId];
    }

    function decideResult(uint256 jobTokenId, address[] memory selectedApplicants) public {
        if (ownerOf(jobTokenId) != msg.sender) {
            revert OnlyJobOwnerCanSelect(jobTokenId);
        }
        if (jobResult[jobTokenId].length > 0) {
            revert ResultAlreadyDeclared(jobTokenId);
        }

        for (uint256 i = 0; i < selectedApplicants.length; i++) {
            jobResult[jobTokenId].push(selectedApplicants[i]);
        }
    }

    function getJobResult(uint256 jobTokenId) public view returns (address[] memory) {
        return jobResult[jobTokenId];
    }
}