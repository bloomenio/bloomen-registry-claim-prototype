#!/bin/bash -x

echo "Sleep for 30 seconds so the master node has initialised"
sleep 30


echo "Start the chain"
multichaind -rpcuser=$RPC_USER -rpcpassword=$RPC_PASSWORD -rpcallowip=$RPC_ALLOW_IP -rpcport=$RPC_PORT -txindex -printtoconsole -shrinkdebugfilesize -autosubscribe=streams $CHAINNAME@$MASTER_NODE:$NETWORK_PORT
