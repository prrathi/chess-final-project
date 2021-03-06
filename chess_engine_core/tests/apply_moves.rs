use chess_engine_core::{self, Board, Color, Move, Piece};

#[test]
fn test_force_apply_move_move_only() {
    let mut board = Board::empty();
    board.castling.black=[false,false,false];
    board.castling.white=[false,false,false];
    // Simple move of a pawn
    board.pieces[1][0] = Some(Piece::Pawn(Color::White));
    let move_ = Move::new((1, 0), (2, 0), None, None);
    board.force_apply_move(&move_);
    assert_eq!(board.pieces[2][0], Some(Piece::Pawn(Color::White)));
    assert_eq!(board.pieces[1][0], None);

    // Move of a pawn that would put the king in check, but should go through (forced)
    board = Board::empty();
    board.pieces[0][0] = Some(Piece::King(Color::White));
    board.pieces[1][1] = Some(Piece::Pawn(Color::White));
    board.pieces[7][7] = Some(Piece::Bishop(Color::Black));
    let move_ = Move::new((1, 1), (2, 1), None, None);
    board.force_apply_move(&move_);
    assert_eq!(board.pieces[2][1], Some(Piece::Pawn(Color::White)));
    assert_eq!(board.pieces[1][1], None);
    assert_eq!(board.pieces[0][0], Some(Piece::King(Color::White)));
    assert_eq!(board.pieces[7][7], Some(Piece::Bishop(Color::Black)));
}

#[test]
fn test_force_apply_move_move_and_capture() {
    let mut board = Board::empty();
    board.castling.black=[false,false,false];
    board.castling.white=[false,false,false];
    // Capture where the piece replaces the captured piece on the board
    // (this includes all captures except en passant)
    board.pieces[1][0] = Some(Piece::Pawn(Color::White));
    board.pieces[2][1] = Some(Piece::Pawn(Color::Black));
    let move_ = Move::new(
        (1, 0),
        (2, 1),
        None,
        Some((Piece::Pawn(Color::Black), (2, 1))),
    );
    board.force_apply_move(&move_);
    assert_eq!(board.pieces[2][1], Some(Piece::Pawn(Color::White)));
    assert_eq!(board.pieces[1][0], None);

    // Capture where the piece is moved to a different position than the captured piece
    // (this is the en passant capture)
    board = Board::empty();
    board.pieces[4][0] = Some(Piece::Pawn(Color::Black));
    board.pieces[4][1] = Some(Piece::Pawn(Color::White));
    let move_ = Move::new(
        (4, 1),
        (3, 0),
        None,
        Some((Piece::Pawn(Color::Black), (4, 0))),
    );
    board.force_apply_move(&move_);
    assert_eq!(board.pieces[3][0], Some(Piece::Pawn(Color::White)));
    assert_eq!(board.pieces[4][1], None);
    assert_eq!(board.pieces[4][0], None);
}

#[test]
fn test_apply_move_not_checkmate() {
    let mut board = Board::empty();
    board.castling.black=[false,false,false];
    board.castling.white=[false,false,false];
    board.pieces[0][0] = Some(Piece::King(Color::White));
    board.pieces[7][7] = Some(Piece::King(Color::Black));
    board.pieces[1][0] = Some(Piece::Pawn(Color::White));
    let move_ = Move::new((1, 0), (3, 0), None, None);
    assert!(!board.apply_move(&move_));
    assert_eq!(board.pieces[3][0], Some(Piece::Pawn(Color::White)));
    assert_eq!(board.pieces[1][0], None);
}

#[test]
fn test_apply_move_checkmate() {
    //Simple checkmate (all conditions are false in apply_move)
    let mut board = Board::empty();
    board.castling.black=[false,false,false];
    board.castling.white=[false,false,false];
    board.pieces[0][0] = Some(Piece::King(Color::White));
    board.pieces[7][7] = Some(Piece::King(Color::Black));
    board.pieces[0][6] = Some(Piece::Rook(Color::White));
    board.pieces[1][6] = Some(Piece::Rook(Color::White));
    let move_ = Move::new((1, 6), (1, 7), None, None);
    assert!(board.apply_move(&move_));

    //Check that the king can move out of
    board.pieces[0][6] = None;
    board.pieces[1][6] = Some(Piece::Rook(Color::White));
    board.pieces[1][7] = None;
    let move_ = Move::new((1, 6), (1, 7), None, None);
    assert!(!board.apply_move(&move_));

    //Check with slider that can be blocked
    board.pieces[0][6] = Some(Piece::Rook(Color::White));
    board.pieces[1][6] = Some(Piece::Rook(Color::White));
    board.pieces[1][7] = None;
    board.pieces[6][0] = Some(Piece::Rook(Color::Black));
    assert!(!board.apply_move(&move_));
}
