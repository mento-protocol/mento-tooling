#!/usr/bin/env bash

##############################################################################
# Script for Approving and Executing a Governance Proposal on a tesnet.
# Usage: ./bin/approve_and_execute.sh 
#               -n <baklava|alfajores|mainnet>  -- network to submit the proposal to
#               -u <upgrade_name>               -- name of the upgrade (MU01)
# Example: ./bin/approve_and_execute.sh -n baklava -u MU01
##############################################################################


set -euo pipefail

source .env

NETWORK=""
PROPOSAL_ID=""
while getopts n:p: flag
do
    case "${flag}" in
        n) NETWORK=${OPTARG};;
        p) PROPOSAL_ID=${OPTARG};;
    esac
done

case $NETWORK in 
    "baklava")
        APPROVER=$BAKLAVA_APPROVER
        APPROVER_PK=$BAKLAVA_APPROVER_PK
        SIGNER=$BAKLAVA_SIGNER
        SIGNER_PK=$BAKLAVA_SIGNER_PK
        RPC_URL=$BAKLAVA_RPC_URL
        ;;
    "alfajores")
        APPROVER=$ALFAJORES_APPROVER
        APPROVER_PK=$ALFAJORES_APPROVER_PK
        SIGNER=$ALFAJORES_SIGNER
        # No SIGNER_PK for alfajores, use port-forwarded node
        SIGNER_PK=
        RPC_URL=$ALFAJORES_RPC_URL
        ;;
    *)
        echo "🚨 Invalid network: '$NETWORK'"
        exit 1
esac

if [ -z "$PROPOSAL_ID" ]; then
    echo "🚨 No proposal ID provided"
    exit 1
fi

echo "📠 Network is $NETWORK"
celocli config:set --node $RPC_URL

echo "😴 31s" &&\
echo -e "\a" && sleep 31 &&\
echo "✅ Approving proposal $PROPOSAL_ID" &&\
echo "==========================================" &&\
celocli governance:approve --proposalID $PROPOSAL_ID --from $APPROVER --useMultiSig --privateKey $APPROVER_PK &&\
echo "😴 301s" &&\
echo -e "\a" && sleep 301 &&\
echo "🗳️ Voting proposal $PROPOSAL_ID" &&\
echo "==========================================" &&\
if [ -z "$SIGNER_PK" ]; then
    celocli governance:vote --value=Yes --from=$SIGNER --proposalID=$PROPOSAL_ID
else
    celocli governance:vote --value=Yes --from=$SIGNER --proposalID=$PROPOSAL_ID --privateKey $SIGNER_PK
if &&\
echo "😴 301s" &&\
echo -e "\a" && sleep 301 &&\
echo "💃 Executing proposal $PROPOSAL_ID" &&\
celocli governance:execute --from=$APPROVER --proposalID=$PROPOSAL_ID --privateKey $APPROVER_PK

# Proposal passed, make some noise
echo -e "\a"
echo -e "\a"
echo -e "\a"