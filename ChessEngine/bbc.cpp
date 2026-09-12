#include <bits/stdc++.h>
#include "json.hpp"

#define U64 unsigned long long

#define set_bit(bitboard, square) (bitboard |= (1ull << square))
#define get_bit(bitboard, square) ((bitboard & (1ull << square)))
#define pop_bit(bitboard, square) (get_bit(bitboard, square) ? bitboard ^= (1ull << square) : 0)

using namespace std;
using json = nlohmann::json;

enum
{
    a8,
    b8,
    c8,
    d8,
    e8,
    f8,
    g8,
    h8,
    a7,
    b7,
    c7,
    d7,
    e7,
    f7,
    g7,
    h7,
    a6,
    b6,
    c6,
    d6,
    e6,
    f6,
    g6,
    h6,
    a5,
    b5,
    c5,
    d5,
    e5,
    f5,
    g5,
    h5,
    a4,
    b4,
    c4,
    d4,
    e4,
    f4,
    g4,
    h4,
    a3,
    b3,
    c3,
    d3,
    e3,
    f3,
    g3,
    h3,
    a2,
    b2,
    c2,
    d2,
    e2,
    f2,
    g2,
    h2,
    a1,
    b1,
    c1,
    d1,
    e1,
    f1,
    g1,
    h1,
};

enum
{
    White,
    Black
};

/*
"a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8",
"a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7",
"a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6",
"a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5",
"a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4",
"a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3",
"a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2",
"a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1",
*/

void print_bitBoard(U64 bitboard)
{
    // loop over board rank
    for (int rank = 0; rank < 8; rank++)
    {
        // loop over files
        for (int files = 0; files < 8; files++)
        {
            int square = rank * 8 + files;

            // print ranks

            if (!files)
            {
                cout << "  ";
                cout << (8 - rank);
                cout << "  ";
            }

            cout << " ";
            cout << (get_bit(bitboard, square) ? 1 : 0);
            cout << " ";
        }
        cout << endl;
    }
    cout << endl;
    cout << "      a  b  c  d  e  f  g  h\n\n";
    cout << "      bitboard: " << bitboard << endl;
}

// not A file constant

/*
  8   0  1  1  1  1  1  1  1
  7   0  1  1  1  1  1  1  1
  6   0  1  1  1  1  1  1  1
  5   0  1  1  1  1  1  1  1
  4   0  1  1  1  1  1  1  1
  3   0  1  1  1  1  1  1  1
  2   0  1  1  1  1  1  1  1
  1   0  1  1  1  1  1  1  1

      a  b  c  d  e  f  g  h
*/

const U64 not_a_file = 18374403900871474942ull;

// not H file constant

/*
  8   1  1  1  1  1  1  1  0
  7   1  1  1  1  1  1  1  0
  6   1  1  1  1  1  1  1  0
  5   1  1  1  1  1  1  1  0
  4   1  1  1  1  1  1  1  0
  3   1  1  1  1  1  1  1  0
  2   1  1  1  1  1  1  1  0
  1   1  1  1  1  1  1  1  0

      a  b  c  d  e  f  g  h
*/

const U64 not_h_file = 9187201950435737471ull;

// not HG file constant

/*
  8   1  1  1  1  1  1  0  0
  7   1  1  1  1  1  1  0  0
  6   1  1  1  1  1  1  0  0
  5   1  1  1  1  1  1  0  0
  4   1  1  1  1  1  1  0  0
  3   1  1  1  1  1  1  0  0
  2   1  1  1  1  1  1  0  0
  1   1  1  1  1  1  1  0  0

      a  b  c  d  e  f  g  h
*/

const U64 not_hg_file = 4557430888798830399ull;

// not AB file constant

/*
  8   0  0  1  1  1  1  1  1
  7   0  0  1  1  1  1  1  1
  6   0  0  1  1  1  1  1  1
  5   0  0  1  1  1  1  1  1
  4   0  0  1  1  1  1  1  1
  3   0  0  1  1  1  1  1  1
  2   0  0  1  1  1  1  1  1
  1   0  0  1  1  1  1  1  1

      a  b  c  d  e  f  g  h
*/

U64 not_ab_file = 18229723555195321596ull;

// blocking position

U64 occupancy = 0ull;

// friend block position

U64 friendlyPiece = 0ull;

// white all piece curr pos

// pawn
U64 whitePawnPos = 0ull;

// King
U64 whiteKingPos = 0ull;

// Queen
U64 whiteQueenPos = 0ull;

// Knight
U64 whiteKnightPos = 0ull;

// Bishop
U64 whiteBishopPos = 0ull;

// Rook
U64 whiteRookPos = 0ull;

// black all piece curr pos

// pawn
U64 blackPawnPos = 0ull;

// King
U64 blackKingPos = 0ull;

// Queen
U64 blackQueenPos = 0ull;

// Knight
U64 blackKnightPos = 0ull;

// Bishop
U64 blackBishopPos = 0ull;

// Rook
U64 blackRookPos = 0ull;

// pawn attacks table [side][square]

U64 pawn_attacks[2][64];

// Knight attacks table [square]

U64 knight_attacks[64];

// king attacks table [square]

U64 king_attacks[64];

// generate Pawn_attacks

U64 mask_pawn_attacks(int side, int square)
{

    // result attack bitboard
    U64 attacks = 0ull;

    // peice bitboard
    U64 bitboard = 0ull;

    set_bit(bitboard, square);
    // print_bitBoard(bitboard);

    if (!side)
    {
        if (((bitboard >> 7) & not_a_file))
            attacks |= (bitboard >> 7);
        if (((bitboard >> 9) & not_h_file))
            attacks |= (bitboard >> 9);
    }
    else
    {
        if (((bitboard << 7) & not_h_file))
            attacks |= (bitboard << 7);
        if (((bitboard << 9) & not_a_file))
            attacks |= (bitboard << 9);
    }

    return attacks;
}

// generate Knight_attacks

U64 mask_knight_attacks(int square)
{
    // result attack bitboard
    U64 attacks = 0ull;

    // peice bitboard
    U64 bitboard = 0ull;

    set_bit(bitboard, square);
    // print_bitBoard(bitboard);

    if ((bitboard >> 17) & not_h_file)
        attacks |= (bitboard >> 17);
    if ((bitboard >> 15) & not_a_file)
        attacks |= (bitboard >> 15);
    if ((bitboard >> 10) & not_hg_file)
        attacks |= (bitboard >> 10);
    if ((bitboard >> 6) & not_ab_file)
        attacks |= (bitboard >> 6);

    if ((bitboard << 17) & not_a_file)
        attacks |= (bitboard << 17);
    if ((bitboard << 15) & not_h_file)
        attacks |= (bitboard << 15);
    if ((bitboard << 10) & not_ab_file)
        attacks |= (bitboard << 10);
    if ((bitboard << 6) & not_hg_file)
        attacks |= (bitboard << 6);

    return attacks;
}

// generate King_attacks

U64 mask_king_attacks(int square)
{
    // result attack bitboard
    U64 attacks = 0ull;

    // peice bitboard
    U64 bitboard = 0ull;

    set_bit(bitboard, square);
    // print_bitBoard(bitboard);

    if (bitboard >> 8)
        attacks |= (bitboard >> 8);
    if ((bitboard >> 9) & not_h_file)
        attacks |= (bitboard >> 9);
    if ((bitboard >> 7) & not_a_file)
        attacks |= (bitboard >> 7);
    if ((bitboard >> 1) & not_h_file)
        attacks |= (bitboard >> 1);
    if (bitboard << 8)
        attacks |= (bitboard << 8);
    if ((bitboard << 9) & not_a_file)
        attacks |= (bitboard << 9);
    if ((bitboard << 7) & not_h_file)
        attacks |= (bitboard << 7);
    if ((bitboard << 1) & not_a_file)
        attacks |= (bitboard << 1);

    return attacks;
}

// generate bishop attacks

U64 mask_bishop_attacks(int square)
{
    // result attack bitboard
    U64 attacks = 0ull;

    // init rank & files
    int r, f;

    // init target rank & files

    int tr = square / 8;
    int tf = square % 8;

    // mask relevent bishop occupency bits
    for (r = tr + 1, f = tf + 1; r <= 7 && f <= 7; r++, f++)
    {
        int target = r * 8 + f;
        if (get_bit(friendlyPiece, target))
            break;
        attacks |= (1ull << (target));
        if (get_bit(occupancy, target))
            break;
    }
    for (r = tr - 1, f = tf + 1; r >= 0 && f <= 7; r--, f++)
    {
        int target = r * 8 + f;
        if (get_bit(friendlyPiece, target))
            break;
        attacks |= (1ull << (target));
        if (get_bit(occupancy, target))
            break;
    }
    for (r = tr - 1, f = tf - 1; r >= 0 && f >= 0; r--, f--)
    {
        int target = r * 8 + f;
        if (get_bit(friendlyPiece, target))
            break;
        attacks |= (1ull << (target));
        if (get_bit(occupancy, target))
            break;
    }
    for (r = tr + 1, f = tf - 1; r <= 7 && f >= 0; r++, f--)
    {
        int target = r * 8 + f;
        if (get_bit(friendlyPiece, target))
            break;
        attacks |= (1ull << (target));
        if (get_bit(occupancy, target))
            break;
    }

    return attacks;
}

// generate rook attacks

U64 mask_rook_attacks(int square)
{
    // result attack bitboard
    U64 attacks = 0ull;

    // init rank & files
    int r, f;

    // init target rank & files

    int tr = square / 8;
    int tf = square % 8;

    // mask relevent rook occupency bits

    for (r = tr + 1; r <= 7; r++)
    {
        int target = r * 8 + tf;
        if (get_bit(friendlyPiece, target))
            break;
        attacks |= (1ull << (target));
        if (get_bit(occupancy, target))
            break;
    }
    for (r = tr - 1; r >= 0; r--)
    {
        int target = r * 8 + tf;
        if (get_bit(friendlyPiece, target))
            break;
        attacks |= (1ull << (target));
        if (get_bit(occupancy, target))
            break;
    }
    for (f = tf + 1; f <= 7; f++)
    {
        int target = tr * 8 + f;
        if (get_bit(friendlyPiece, target))
            break;
        attacks |= (1ull << (target));
        if (get_bit(occupancy, target))
            break;
    }
    for (f = tf - 1; f >= 0; f--)
    {
        int target = tr * 8 + f;
        if (get_bit(friendlyPiece, target))
            break;
        attacks |= (1ull << (target));
        if (get_bit(occupancy, target))
            break;
    }

    return attacks;
}

int square_from_string(string square)
{

    int file = square[0] - 'a';
    int rank = square[1] - '0';

    return (8 - rank) * 8 + file;
}

string square_to_string(int square)
{
    int file = square % 8;
    int rank = 8 - (square / 8);

    string result;

    result += char('a' + file);
    result += char('0' + rank);

    return result;
}

// pawn capture

U64 pawn_capture(int side, int square)
{

    // result attack bitboard
    U64 attacks = 0ull;

    // peice bitboard
    U64 bitboard = 0ull;

    set_bit(bitboard, square);
    // print_bitBoard(bitboard);

    if (!side)
    {
        if (((bitboard >> 7) & not_a_file) && ((bitboard >> 7) & occupancy))
            attacks |= (bitboard >> 7);
        if (((bitboard >> 9) & not_h_file) && ((bitboard >> 9) & occupancy))
            attacks |= (bitboard >> 9);
    }
    else
    {
        if (((bitboard << 7) & not_h_file) && ((bitboard << 7) & occupancy))
            attacks |= (bitboard << 7);
        if (((bitboard << 9) & not_a_file) && ((bitboard << 9) & occupancy))
            attacks |= (bitboard << 9);
    }

    return attacks;
}

// pawn moves

U64 generate_pawn_move(int side, int square)
{
    U64 move = 0ull;

    U64 bitboard = 0ull;
    set_bit(bitboard, square);

    if (side == White)
    {
        U64 oneStep = (bitboard >> 8) & ~occupancy;

        move |= oneStep;

        if ((square / 8) == 6 && oneStep)
        {
            move |= (bitboard >> 16) & ~occupancy;
        }
    }
    else
    {
        U64 oneStep = (bitboard << 8) & ~occupancy;

        move |= oneStep;

        if ((square / 8) == 1 && oneStep)
        {
            move |= (bitboard << 16) & ~occupancy;
        }
    }

    move |= pawn_capture(side,square) & ~friendlyPiece;

    return move;
}

void init_leapers_attacks()
{
    // loop over 64 boards sqares

    for (int square = 0; square < 64; square++)
    {

        // init pawn_attacks
        pawn_attacks[White][square] = mask_pawn_attacks(White, square);
        pawn_attacks[Black][square] = mask_pawn_attacks(Black, square);

        // init knight_attacks
        knight_attacks[square] = mask_knight_attacks(square);

        // init knight_attacks
        king_attacks[square] = mask_king_attacks(square);
    }
}

bool is_square_attacked(int square, int side)
{

    if (!side)
    {
        if (pawn_attacks[Black][square] & whitePawnPos)
            return true;
        if (knight_attacks[square] & whiteKnightPos)
            return true;
        if (king_attacks[square] & whiteKingPos)
            return true;
        if (mask_bishop_attacks(square) & (whiteBishopPos | whiteQueenPos))
            return true;
        if (mask_rook_attacks(square) & (whiteRookPos | whiteQueenPos))
            return true;
    }
    else
    {
        if (pawn_attacks[White][square] & blackPawnPos)
            return true;
        if (knight_attacks[square] & blackKnightPos)
            return true;
        if (king_attacks[square] & blackKingPos)
            return true;
        if (mask_bishop_attacks(square) & (blackBishopPos | blackQueenPos))
            return true;
        if (mask_rook_attacks(square) & (blackRookPos | blackQueenPos))
            return true;
    }
    return false;
}

bool legal(string piece, int color, int source, int target)
{
    // Save current board state
    U64 oldOccupancy = occupancy;
    U64 oldFriendlyPiece = friendlyPiece;

    U64 oldWhitePawnPos = whitePawnPos;
    U64 oldWhiteKingPos = whiteKingPos;
    U64 oldWhiteQueenPos = whiteQueenPos;
    U64 oldWhiteKnightPos = whiteKnightPos;
    U64 oldWhiteBishopPos = whiteBishopPos;
    U64 oldWhiteRookPos = whiteRookPos;

    U64 oldBlackPawnPos = blackPawnPos;
    U64 oldBlackKingPos = blackKingPos;
    U64 oldBlackQueenPos = blackQueenPos;
    U64 oldBlackKnightPos = blackKnightPos;
    U64 oldBlackBishopPos = blackBishopPos;
    U64 oldBlackRookPos = blackRookPos;


    // Move the piece

    if (color == White)
    {
        if (piece == "P")
        {
            pop_bit(whitePawnPos, source);
            set_bit(whitePawnPos, target);
        }
        else if (piece == "N")
        {
            pop_bit(whiteKnightPos, source);
            set_bit(whiteKnightPos, target);
        }
        else if (piece == "K")
        {
            pop_bit(whiteKingPos, source);
            set_bit(whiteKingPos, target);
        }
        else if (piece == "Q")
        {
            pop_bit(whiteQueenPos, source);
            set_bit(whiteQueenPos, target);
        }
        else if (piece == "B")
        {
            pop_bit(whiteBishopPos, source);
            set_bit(whiteBishopPos, target);
        }
        else if (piece == "R")
        {
            pop_bit(whiteRookPos, source);
            set_bit(whiteRookPos, target);
        }
    }
    else
    {
        if (piece == "P")
        {
            pop_bit(blackPawnPos, source);
            set_bit(blackPawnPos, target);
        }
        else if (piece == "N")
        {
            pop_bit(blackKnightPos, source);
            set_bit(blackKnightPos, target);
        }
        else if (piece == "K")
        {
            pop_bit(blackKingPos, source);
            set_bit(blackKingPos, target);
        }
        else if (piece == "Q")
        {
            pop_bit(blackQueenPos, source);
            set_bit(blackQueenPos, target);
        }
        else if (piece == "B")
        {
            pop_bit(blackBishopPos, source);
            set_bit(blackBishopPos, target);
        }
        else if (piece == "R")
        {
            pop_bit(blackRookPos, source);
            set_bit(blackRookPos, target);
        }
    }


    // Remove captured enemy piece

    if (color == White)
    {
        pop_bit(blackPawnPos, target);
        pop_bit(blackKnightPos, target);
        pop_bit(blackBishopPos, target);
        pop_bit(blackRookPos, target);
        pop_bit(blackQueenPos, target);
        pop_bit(blackKingPos, target);
    }
    else
    {
        pop_bit(whitePawnPos, target);
        pop_bit(whiteKnightPos, target);
        pop_bit(whiteBishopPos, target);
        pop_bit(whiteRookPos, target);
        pop_bit(whiteQueenPos, target);
        pop_bit(whiteKingPos, target);
    }


    // Rebuild occupancy

    occupancy =
        whitePawnPos |
        whiteKingPos |
        whiteQueenPos |
        whiteKnightPos |
        whiteBishopPos |
        whiteRookPos |
        blackPawnPos |
        blackKingPos |
        blackQueenPos |
        blackKnightPos |
        blackBishopPos |
        blackRookPos;


    // Rebuild friendly pieces

    if (color == White)
    {
        friendlyPiece =
            whitePawnPos |
            whiteKingPos |
            whiteQueenPos |
            whiteKnightPos |
            whiteBishopPos |
            whiteRookPos;
    }
    else
    {
        friendlyPiece =
            blackPawnPos |
            blackKingPos |
            blackQueenPos |
            blackKnightPos |
            blackBishopPos |
            blackRookPos;
    }


    // Find our king AFTER the move

    int kingSquare;

    if (color == White)
        kingSquare = __builtin_ctzll(whiteKingPos);
    else
        kingSquare = __builtin_ctzll(blackKingPos);


    // Check whether our king is attacked

    bool legalMove;

    if (color == White)
        legalMove = !is_square_attacked(kingSquare, Black);
    else
        legalMove = !is_square_attacked(kingSquare, White);


    // Restore EVERYTHING

    occupancy = oldOccupancy;
    friendlyPiece = oldFriendlyPiece;

    whitePawnPos = oldWhitePawnPos;
    whiteKingPos = oldWhiteKingPos;
    whiteQueenPos = oldWhiteQueenPos;
    whiteKnightPos = oldWhiteKnightPos;
    whiteBishopPos = oldWhiteBishopPos;
    whiteRookPos = oldWhiteRookPos;

    blackPawnPos = oldBlackPawnPos;
    blackKingPos = oldBlackKingPos;
    blackQueenPos = oldBlackQueenPos;
    blackKnightPos = oldBlackKnightPos;
    blackBishopPos = oldBlackBishopPos;
    blackRookPos = oldBlackRookPos;


    return legalMove;
}


bool has_legal_move(int color){
    if(!color){
        // pawn
        
        U64 pos=whitePawnPos;
        while(pos){
            int whitePawnSquare=__builtin_ctzll(pos);
            U64 attacks=generate_pawn_move(color,whitePawnSquare) & ~friendlyPiece;
            for(int target=0; target<64; target++){
                if(get_bit(attacks,target)){
                    if(legal("P",color,whitePawnSquare,target)){
                        return true;
                    }
                }
            }
            pos&=(pos-1);
        }

        // king

        pos=whiteKingPos;
        while(pos){
            int whiteKingSquare=__builtin_ctzll(pos);
            U64 attacks=king_attacks[whiteKingSquare] & ~friendlyPiece;
            for(int target=0; target<64; target++){
                if(get_bit(attacks,target)){
                    if(legal("K",color,whiteKingSquare,target)){
                        return true;
                    }
                }
            }
            pos&=(pos-1);
        }
        
        // Queen

        pos=whiteQueenPos;
        while(pos){
            int whiteQueenSquare=__builtin_ctzll(pos);
            U64 attacks=mask_bishop_attacks(whiteQueenSquare) | mask_rook_attacks(whiteQueenSquare);
            for(int target=0; target<64; target++){
                if(get_bit(attacks,target)){
                    if(legal("Q",color,whiteQueenSquare,target)){
                        return true;
                    }
                }
            }
            pos&=(pos-1);
        }
        
        // Knight

        pos=whiteKnightPos;
        while(pos){
            int whiteKnightSquare=__builtin_ctzll(pos);
            U64 attacks=knight_attacks[whiteKnightSquare] & ~friendlyPiece;
            for(int target=0; target<64; target++){
                if(get_bit(attacks,target)){
                    if(legal("N",color,whiteKnightSquare,target)){
                        return true;
                    }
                }
            }
            pos&=(pos-1);
        }
        
        // Bishop

        pos=whiteBishopPos;
        while(pos){
            int whiteBishopSquare=__builtin_ctzll(pos);
            U64 attacks=mask_bishop_attacks(whiteBishopSquare);
            for(int target=0; target<64; target++){
                if(get_bit(attacks,target)){
                    if(legal("B",color,whiteBishopSquare,target)){
                        return true;
                    }
                }
            }
            pos&=(pos-1);
        }
        
        // Rook

        pos=whiteRookPos;
        while(pos){
            int whiteRookSquare=__builtin_ctzll(pos);
            U64 attacks=mask_rook_attacks(whiteRookSquare);
            for(int target=0; target<64; target++){
                if(get_bit(attacks,target)){
                    if(legal("R",color,whiteRookSquare,target)){
                        return true;
                    }
                }
            }
            pos&=(pos-1);
        }

    }else{
        // pawn
        
        U64 pos=blackPawnPos;
        while(pos){
            int blackPawnSquare=__builtin_ctzll(pos);
            U64 attacks=generate_pawn_move(color,blackPawnSquare) & ~friendlyPiece;
            for(int target=0; target<64; target++){
                if(get_bit(attacks,target)){
                    if(legal("P",color,blackPawnSquare,target)){
                        return true;
                    }
                }
            }
            pos&=(pos-1);
        }

        // king

        pos=blackKingPos;
        while(pos){
            int blackKingSquare=__builtin_ctzll(pos);
            U64 attacks=king_attacks[blackKingSquare] & ~friendlyPiece;
            for(int target=0; target<64; target++){
                if(get_bit(attacks,target)){
                    if(legal("K",color,blackKingSquare,target)){
                        return true;
                    }
                }
            }
            pos&=(pos-1);
        }
        
        // Queen

        pos=blackQueenPos;
        while(pos){
            int blackQueenSquare=__builtin_ctzll(pos);
            U64 attacks=mask_bishop_attacks(blackQueenSquare) | mask_rook_attacks(blackQueenSquare);
            for(int target=0; target<64; target++){
                if(get_bit(attacks,target)){
                    if(legal("Q",color,blackQueenSquare,target)){
                        return true;
                    }
                }
            }
            pos&=(pos-1);
        }
        
        // Knight

        pos=blackKnightPos;
        while(pos){
            int blackKnightSquare=__builtin_ctzll(pos);
            U64 attacks=knight_attacks[blackKnightSquare] & ~friendlyPiece;
            for(int target=0; target<64; target++){
                if(get_bit(attacks,target)){
                    if(legal("N",color,blackKnightSquare,target)){
                        return true;
                    }
                }
            }
            pos&=(pos-1);
        }
        
        // Bishop

        pos=blackBishopPos;
        while(pos){
            int blackBishopSquare=__builtin_ctzll(pos);
            U64 attacks=mask_bishop_attacks(blackBishopSquare);
            for(int target=0; target<64; target++){
                if(get_bit(attacks,target)){
                    if(legal("B",color,blackBishopSquare,target)){
                        return true;
                    }
                }
            }
            pos&=(pos-1);
        }
        
        // Rook

        pos=blackRookPos;
        while(pos){
            int blackRookSquare=__builtin_ctzll(pos);
            U64 attacks=mask_rook_attacks(blackRookSquare);
            for(int target=0; target<64; target++){
                if(get_bit(attacks,target)){
                    if(legal("R",color,blackRookSquare,target)){
                        return true;
                    }
                }
            }
            pos&=(pos-1);
        }
    }
    return false;
}


int main()
{

    // print_bitBoard(mask_king_attacks(h4));

    // init_leapers_attacks();

    // for(int square=0; square<64; square++){
    //     print_bitBoard(knight_attacks[square]);
    // }

    // set_bit(occupancy,d4);

    // print_bitBoard(mask_bishop_attacks(c3));


    string input;

    getline(cin, input);

    json data = json::parse(input);
    string side = data["side"];
    string square = data["square"];
    string piece = data["piece"];
    vector<vector<string>> currBoard = data["currBoard"].get<vector<vector<string>>>();

    for (int row = 0; row < 8; row++)
    {
        for (int col = 0; col < 8; col++)
        {
            if (currBoard[row][col] != "")
            {
                int block = row * 8 + col;
                set_bit(occupancy, block);
                if (currBoard[row][col][0] == side[0])
                    set_bit(friendlyPiece, block);
                if (currBoard[row][col][0] == 'w')
                {
                    if (currBoard[row][col][1] == 'P')
                        set_bit(whitePawnPos, block);
                    if (currBoard[row][col][1] == 'K')
                        set_bit(whiteKingPos, block);
                    if (currBoard[row][col][1] == 'Q')
                        set_bit(whiteQueenPos, block);
                    if (currBoard[row][col][1] == 'N')
                        set_bit(whiteKnightPos, block);
                    if (currBoard[row][col][1] == 'B')
                        set_bit(whiteBishopPos, block);
                    if (currBoard[row][col][1] == 'R')
                        set_bit(whiteRookPos, block);
                }
                if (currBoard[row][col][0] == 'b')
                {
                    if (currBoard[row][col][1] == 'P')
                        set_bit(blackPawnPos, block);
                    if (currBoard[row][col][1] == 'K')
                        set_bit(blackKingPos, block);
                    if (currBoard[row][col][1] == 'Q')
                        set_bit(blackQueenPos, block);
                    if (currBoard[row][col][1] == 'N')
                        set_bit(blackKnightPos, block);
                    if (currBoard[row][col][1] == 'B')
                        set_bit(blackBishopPos, block);
                    if (currBoard[row][col][1] == 'R')
                        set_bit(blackRookPos, block);
                }
            }
        }
    }

    init_leapers_attacks();

    int color = (side == "white") ? White : Black;

    int sourceSquare = square_from_string(square);

    U64 attacks = 0ull;

    if (piece == "P")
        attacks = generate_pawn_move(color,sourceSquare) & ~friendlyPiece;
    if (piece == "N")
        attacks = knight_attacks[sourceSquare] & ~friendlyPiece;
    if (piece == "K")
        attacks = king_attacks[sourceSquare] & ~friendlyPiece;
    if (piece == "B")
        attacks = mask_bishop_attacks(sourceSquare);
    if (piece == "R")
        attacks = mask_rook_attacks(sourceSquare);
    if (piece == "Q")
        attacks = (mask_rook_attacks(sourceSquare) | mask_bishop_attacks(sourceSquare));

    for (int target = 0; target < 64; target++)
    {
        if (get_bit(attacks, target))
        {
            if(legal(piece,color,sourceSquare,target)){
                cout << square_to_string(target) << " ";
            }
        }
    }

    int whiteKingSquare=__builtin_ctzll(whiteKingPos);
    int blackKingSquare=__builtin_ctzll(blackKingPos);

    // if(!has_legal_move(color)){
    //     if(!color){
    //         if(is_square_attacked(whiteKingSquare,Black))cout<<"CheckMate white";
    //         else cout<<"StaleMate";
    //     }else{
    //         if(is_square_attacked(blackKingSquare,White))cout<<"CheckMate black";
    //         else cout<<"StaleMate";
    //     }
    // }

    return 0;
}