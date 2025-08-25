"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

document.addEventListener("DOMContentLoaded", function () {
  var challengeButton = document.getElementById("eventGame-btn");
  var gameBox = document.querySelector(".promotion-game-event__item.game-box");
  var puzzleCanvas = document.getElementById("puzzleCanvas");
  var ctx = puzzleCanvas.getContext("2d");
  var startButton = document.querySelector(".promotion-game-event__btn");
  var timerDisplay = document.querySelector(".promotion-game-event__info-time");
  var clearPopup = document.querySelector(".popup.game-clear");
  var overPopup = document.querySelector(".popup.game-over");
  var htmlBody = document.documentElement; // 이미지 리스트

  var imagePaths = ["https://cdn.louisclub.com/static/mo/img/specialty/20250908/img_puzzle_game_01.png", "https://cdn.louisclub.com/static/mo/img/specialty/20250908/img_puzzle_game_02.png", "https://cdn.louisclub.com/static/mo/img/specialty/20250908/img_puzzle_game_03.png"];
  var originalImage = new Image();
  var puzzlePieces = [];
  var rows = 3;
  var cols = 3;
  var pieceWidth;
  var pieceHeight;
  var bumpSize;
  var snapTolerance;
  var draggedPiece = null;
  var offsetX, offsetY;
  var animationFrameId = null;
  var timeLeft = 60;
  var timerInterval = null; // --- 이벤트 핸들러 통합 (마우스 + 터치) ---

  function getEventPos(e) {
    var rect = puzzleCanvas.getBoundingClientRect();

    if (e.touches && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  }

  var onStart = function onStart(e) {
    if (e.touches && e.touches.length > 0) e.preventDefault();
    if (puzzlePieces.length === 0) return;

    var _getEventPos = getEventPos(e),
        x = _getEventPos.x,
        y = _getEventPos.y;

    for (var i = puzzlePieces.length - 1; i >= 0; i--) {
      var piece = puzzlePieces[i];
      if (piece.isCorrectlyPlaced) continue;
      ctx.beginPath();
      piece.pathFn(ctx, piece.currentX, piece.currentY);
      ctx.closePath();

      if (ctx.isPointInPath(x, y)) {
        draggedPiece = piece;
        offsetX = x - piece.currentX;
        offsetY = y - piece.currentY;
        puzzleCanvas.style.cursor = "grabbing";
        puzzlePieces.splice(i, 1);
        puzzlePieces.push(draggedPiece);
        drawPuzzle();
        break;
      }
    }
  };

  var onMove = function onMove(e) {
    if (draggedPiece) {
      var _getEventPos2 = getEventPos(e),
          x = _getEventPos2.x,
          y = _getEventPos2.y;

      draggedPiece.currentX = x - offsetX;
      draggedPiece.currentY = y - offsetY;
      if (!animationFrameId) animationFrameId = requestAnimationFrame(drawPuzzle);
    }
  };

  var onEnd = function onEnd() {
    if (draggedPiece) {
      snapPiece(draggedPiece);
      draggedPiece = null;
      puzzleCanvas.style.cursor = "grab";
      drawPuzzle();
      checkCompletion();
    }

    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }; // --- 퍼즐 크기 및 변수 동적 설정 ---


  function setPuzzleSize() {
    // PC 버전에 맞게 캔버스 크기를 고정 값으로 설정 (예: 500px)
    var puzzleSize = 850;
    puzzleCanvas.width = puzzleSize;
    puzzleCanvas.height = puzzleSize;
    pieceWidth = puzzleCanvas.width / cols;
    pieceHeight = puzzleCanvas.height / rows;
    bumpSize = puzzleSize * 0.03;
    snapTolerance = puzzleSize * 0.05;
  } // --- 퍼즐 조각 생성 및 섞기 ---


  function createPuzzlePieces() {
    puzzlePieces = [];

    for (var r = 0; r < rows; r++) {
      var _loop = function _loop(c) {
        var piece = {
          id: "".concat(r, "-").concat(c),
          row: r,
          col: c,
          originalX: c * pieceWidth,
          originalY: r * pieceHeight,
          width: pieceWidth,
          height: pieceHeight,
          currentX: 0,
          currentY: 0,
          isCorrectlyPlaced: false,
          snapPoints: {}
        };
        piece.topType = r === 0 ? 0 : Math.random() > 0.5 ? 1 : -1;
        piece.rightType = c === cols - 1 ? 0 : Math.random() > 0.5 ? 1 : -1;
        piece.bottomType = r === rows - 1 ? 0 : piece.topType * -1;
        piece.leftType = c === 0 ? 0 : piece.rightType * -1;
        updatePieceSnapPoints(piece);

        piece.pathFn = function (ctx, x, y) {
          var p = {
            tl: {
              x: x,
              y: y
            },
            tr: {
              x: x + pieceWidth,
              y: y
            },
            bl: {
              x: x,
              y: y + pieceHeight
            },
            br: {
              x: x + pieceWidth,
              y: y + pieceHeight
            }
          };
          ctx.moveTo(p.tl.x, p.tl.y);
          drawEdge(ctx, p.tl, p.tr, piece.topType, "horizontal", false);
          drawEdge(ctx, p.tr, p.br, piece.rightType, "vertical", false);
          drawEdge(ctx, p.br, p.bl, piece.bottomType, "horizontal", true);
          drawEdge(ctx, p.bl, p.tl, piece.leftType, "vertical", true);
        };

        puzzlePieces.push(piece);
      };

      for (var c = 0; c < cols; c++) {
        _loop(c);
      }
    }
  } // --- 기타 헬퍼 함수 (기존 코드와 동일) ---


  function updatePieceSnapPoints(piece) {
    piece.snapPoints.top = {
      x: pieceWidth / 2,
      y: piece.topType === 1 ? -bumpSize : piece.topType === -1 ? bumpSize : 0
    };
    piece.snapPoints.right = {
      x: pieceWidth + (piece.rightType === 1 ? bumpSize : piece.rightType === -1 ? -bumpSize : 0),
      y: pieceHeight / 2
    };
    piece.snapPoints.bottom = {
      x: pieceWidth / 2,
      y: pieceHeight + (piece.bottomType === 1 ? bumpSize : piece.bottomType === -1 ? -bumpSize : 0)
    };
    piece.snapPoints.left = {
      x: piece.leftType === 1 ? -bumpSize : piece.leftType === -1 ? bumpSize : 0,
      y: pieceHeight / 2
    };
  }

  function drawEdge(ctx, startPoint, endPoint, type, orientation) {
    var reverse = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

    if (type === 0) {
      ctx.lineTo(endPoint.x, endPoint.y);
      return;
    }

    var dir = reverse ? -1 : 1;
    var curveOffset = pieceWidth * 0.25;
    var curveOffsetVert = pieceHeight * 0.25;
    var midRatio = 0.5;

    if (orientation === "horizontal") {
      ctx.lineTo(startPoint.x + curveOffset * dir, startPoint.y);
      ctx.bezierCurveTo(startPoint.x + curveOffset * dir, startPoint.y + bumpSize * type, startPoint.x + pieceWidth * midRatio * dir, startPoint.y + bumpSize * type, startPoint.x + pieceWidth * midRatio * dir, startPoint.y + bumpSize * type);
      ctx.bezierCurveTo(startPoint.x + pieceWidth * midRatio * dir, startPoint.y + bumpSize * type, endPoint.x - curveOffset * dir, endPoint.y + bumpSize * type, endPoint.x - curveOffset * dir, endPoint.y);
      ctx.lineTo(endPoint.x, endPoint.y);
    } else {
      ctx.lineTo(startPoint.x, startPoint.y + curveOffsetVert * dir);
      ctx.bezierCurveTo(startPoint.x + bumpSize * type, startPoint.y + curveOffsetVert * dir, startPoint.x + bumpSize * type, startPoint.y + pieceHeight * midRatio * dir, startPoint.x + bumpSize * type, startPoint.y + pieceHeight * midRatio * dir);
      ctx.bezierCurveTo(startPoint.x + bumpSize * type, startPoint.y + pieceHeight * midRatio * dir, endPoint.x + bumpSize * type, endPoint.y - curveOffsetVert * dir, endPoint.x, endPoint.y - curveOffsetVert * dir);
      ctx.lineTo(endPoint.x, endPoint.y);
    }
  }

  function shufflePieces(pieces) {
    var shuffledPositions = [];
    var padding = 20;
    var maxAttempts = 1000;

    for (var i = 0; i < pieces.length; i++) {
      var newX = void 0,
          newY = void 0;
      var collision = void 0;
      var attempts = 0;

      do {
        collision = false;
        newX = padding + Math.random() * (puzzleCanvas.width - pieceWidth - padding * 2);
        newY = padding + Math.random() * (puzzleCanvas.height - pieceHeight - padding * 2);

        var _iterator = _createForOfIteratorHelper(shuffledPositions),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var pos = _step.value;

            if (newX < pos.x + pieceWidth && newX + pieceWidth > pos.x && newY < pos.y + pieceHeight && newY + pieceHeight > pos.y) {
              collision = true;
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        attempts++;
      } while (collision && attempts < maxAttempts);

      if (attempts === maxAttempts) {
        console.warn("Could not find non-overlapping position for piece, placing it anyway.");
      }

      shuffledPositions.push({
        x: newX,
        y: newY
      });
    }

    pieces.forEach(function (piece, index) {
      piece.currentX = shuffledPositions[index].x;
      piece.currentY = shuffledPositions[index].y;
      piece.isCorrectlyPlaced = false;
    });
  }

  function drawPuzzle() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }

    ctx.clearRect(0, 0, puzzleCanvas.width, puzzleCanvas.height);
    if (!originalImage.src || puzzlePieces.length === 0) return;

    var piecesToDraw = _toConsumableArray(puzzlePieces);

    if (draggedPiece) {
      var index = piecesToDraw.indexOf(draggedPiece);

      if (index > -1) {
        piecesToDraw.splice(index, 1);
        piecesToDraw.push(draggedPiece);
      }
    }

    var scale = Math.min(puzzleCanvas.width / originalImage.width, puzzleCanvas.height / originalImage.height);
    var imgWidth = originalImage.width * scale;
    var imgHeight = originalImage.height * scale;
    var offsetX_img = (puzzleCanvas.width - imgWidth) / 2;
    var offsetY_img = (puzzleCanvas.height - imgHeight) / 2;
    piecesToDraw.forEach(function (piece) {
      ctx.save();
      ctx.beginPath();
      piece.pathFn(ctx, piece.currentX, piece.currentY);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(originalImage, piece.originalX / scale, piece.originalY / scale, piece.width / scale, piece.height / scale, piece.currentX, piece.currentY, piece.width, piece.height);
      ctx.restore();
      ctx.beginPath();
      piece.pathFn(ctx, piece.currentX, piece.currentY);
      ctx.strokeStyle = piece.isCorrectlyPlaced ? "#28a745" : "#666";
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }

  function snapPiece(draggedPiece) {
    if (draggedPiece.isCorrectlyPlaced) return;
    var snapped = false;
    var draggedSnapPoints = {
      top: {
        x: draggedPiece.currentX + draggedPiece.snapPoints.top.x,
        y: draggedPiece.currentY + draggedPiece.snapPoints.top.y
      },
      right: {
        x: draggedPiece.currentX + draggedPiece.snapPoints.right.x,
        y: draggedPiece.currentY + draggedPiece.snapPoints.right.y
      },
      bottom: {
        x: draggedPiece.currentX + draggedPiece.snapPoints.bottom.x,
        y: draggedPiece.currentY + draggedPiece.snapPoints.bottom.y
      },
      left: {
        x: draggedPiece.currentX + draggedPiece.snapPoints.left.x,
        y: draggedPiece.currentY + draggedPiece.snapPoints.left.y
      }
    };
    var targetOriginalX = draggedPiece.col * pieceWidth;
    var targetOriginalY = draggedPiece.row * pieceHeight;
    var distToSelfTargetSq = Math.pow(draggedPiece.currentX - targetOriginalX, 2) + Math.pow(draggedPiece.currentY - targetOriginalY, 2);

    if (distToSelfTargetSq < Math.pow(snapTolerance, 2)) {
      var positionTaken = puzzlePieces.some(function (p) {
        return p !== draggedPiece && p.isCorrectlyPlaced && p.originalX === targetOriginalX && p.originalY === targetOriginalY;
      });

      if (!positionTaken) {
        draggedPiece.currentX = targetOriginalX;
        draggedPiece.currentY = targetOriginalY;
        draggedPiece.isCorrectlyPlaced = true;
        snapped = true;
      }
    }

    if (!snapped) {
      var _iterator2 = _createForOfIteratorHelper(puzzlePieces),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var otherPiece = _step2.value;
          if (otherPiece === draggedPiece || otherPiece.isCorrectlyPlaced) continue;
          var otherSnapPoints = {
            top: {
              x: otherPiece.currentX + otherPiece.snapPoints.top.x,
              y: otherPiece.currentY + otherPiece.snapPoints.top.y
            },
            right: {
              x: otherPiece.currentX + otherPiece.snapPoints.right.x,
              y: otherPiece.currentY + otherPiece.snapPoints.right.y
            },
            bottom: {
              x: otherPiece.currentX + otherPiece.snapPoints.bottom.x,
              y: otherPiece.currentY + otherPiece.snapPoints.bottom.y
            },
            left: {
              x: otherPiece.currentX + otherPiece.snapPoints.left.x,
              y: otherPiece.currentY + otherPiece.snapPoints.left.y
            }
          };
          var dRow = draggedPiece.row - otherPiece.row;
          var dCol = draggedPiece.col - otherPiece.col;
          var potentialNewX = draggedPiece.currentX;
          var potentialNewY = draggedPiece.currentY;
          var matched = false;

          if (dRow === -1 && dCol === 0 && draggedPiece.topType * -1 === otherPiece.bottomType && draggedPiece.topType !== 0) {
            var distSq = Math.pow(draggedSnapPoints.top.x - otherSnapPoints.bottom.x, 2) + Math.pow(draggedSnapPoints.top.y - otherSnapPoints.bottom.y, 2);

            if (distSq < Math.pow(snapTolerance, 2)) {
              potentialNewX = otherSnapPoints.bottom.x - draggedPiece.snapPoints.top.x;
              potentialNewY = otherSnapPoints.bottom.y - draggedPiece.snapPoints.top.y;
              matched = true;
            }
          } else if (dRow === 0 && dCol === 1 && draggedPiece.rightType * -1 === otherPiece.leftType && draggedPiece.rightType !== 0) {
            var _distSq = Math.pow(draggedSnapPoints.right.x - otherSnapPoints.left.x, 2) + Math.pow(draggedSnapPoints.right.y - otherSnapPoints.left.y, 2);

            if (_distSq < Math.pow(snapTolerance, 2)) {
              potentialNewX = otherSnapPoints.left.x - draggedPiece.snapPoints.right.x;
              potentialNewY = otherSnapPoints.left.y - draggedPiece.snapPoints.right.y;
              matched = true;
            }
          } else if (dRow === 1 && dCol === 0 && draggedPiece.bottomType * -1 === otherPiece.topType && draggedPiece.bottomType !== 0) {
            var _distSq2 = Math.pow(draggedSnapPoints.bottom.x - otherSnapPoints.top.x, 2) + Math.pow(draggedSnapPoints.bottom.y - otherSnapPoints.top.y, 2);

            if (_distSq2 < Math.pow(snapTolerance, 2)) {
              potentialNewX = otherSnapPoints.top.x - draggedPiece.snapPoints.bottom.x;
              potentialNewY = otherSnapPoints.top.y - draggedPiece.snapPoints.bottom.y;
              matched = true;
            }
          } else if (dRow === 0 && dCol === -1 && draggedPiece.leftType * -1 === otherPiece.rightType && draggedPiece.leftType !== 0) {
            var _distSq3 = Math.pow(draggedSnapPoints.left.x - otherSnapPoints.right.x, 2) + Math.pow(draggedSnapPoints.left.y - otherSnapPoints.right.y, 2);

            if (_distSq3 < Math.pow(snapTolerance, 2)) {
              potentialNewX = otherSnapPoints.right.x - draggedPiece.snapPoints.left.x;
              potentialNewY = otherSnapPoints.right.y - draggedPiece.snapPoints.left.y;
              matched = true;
            }
          }

          if (matched) {
            var finalDistSq = Math.pow(potentialNewX - targetOriginalX, 2) + Math.pow(potentialNewY - targetOriginalY, 2);

            if (finalDistSq < Math.pow(snapTolerance, 2)) {
              draggedPiece.currentX = targetOriginalX;
              draggedPiece.currentY = targetOriginalY;
              draggedPiece.isCorrectlyPlaced = true;
              snapped = true;
              break;
            }
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }

    if (!snapped) {
      draggedPiece.isCorrectlyPlaced = false;
    }

    return snapped;
  }

  function checkCompletion() {
    var allCorrect = puzzlePieces.every(function (piece) {
      return piece.isCorrectlyPlaced;
    });

    if (allCorrect && puzzlePieces.length > 0) {
      startButton.textContent = "완료";
      clearInterval(timerInterval);
      showPopup(clearPopup);
    } else {
      startButton.textContent = "포기하기";
    }
  }

  function showPopup(popupElement) {
    popupElement.classList.add('is-active');
    htmlBody.classList.add('is-hidden');
  }

  function hidePopup() {
    document.querySelectorAll('.popup.is-active').forEach(function (popup) {
      return popup.classList.remove('is-active');
    });
    htmlBody.classList.remove('is-hidden');
  } // --- 게임 시작 및 타이머 관련 함수 ---


  function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timeLeft = 60;
    timerDisplay.textContent = "01:00";
    timerInterval = setInterval(function () {
      timeLeft--;
      var minutes = Math.floor(timeLeft / 60);
      var seconds = timeLeft % 60;
      var formattedTime = "".concat(String(minutes).padStart(2, '0'), ":").concat(String(seconds).padStart(2, '0'));
      timerDisplay.textContent = "00:".concat(formattedTime);

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        var isCompleted = puzzlePieces.every(function (piece) {
          return piece.isCorrectlyPlaced;
        }); // 타이머 종료 시 퍼즐 완성 여부에 따라 팝업 자동 호출

        if (isCompleted) {
          showPopup(clearPopup);
        } else {
          showPopup(overPopup);
        } // 타이머 종료 후 이벤트 리스너 제거


        puzzleCanvas.removeEventListener("mousedown", onStart);
        puzzleCanvas.removeEventListener("touchstart", onStart);
      }
    }, 1000);
  }

  function loadAndInitPuzzle() {
    var randomPath = imagePaths[Math.floor(Math.random() * imagePaths.length)];

    originalImage.onload = function () {
      setPuzzleSize();
      createPuzzlePieces();
      shufflePieces(puzzlePieces);
      drawPuzzle();
      puzzleCanvas.style.cursor = "grab";
      puzzleCanvas.addEventListener("mousedown", onStart);
      puzzleCanvas.addEventListener("mousemove", onMove);
      puzzleCanvas.addEventListener("mouseup", onEnd);
      puzzleCanvas.addEventListener("mouseleave", onEnd);
      puzzleCanvas.addEventListener("touchstart", onStart, {
        passive: false
      });
      puzzleCanvas.addEventListener("touchmove", onMove, {
        passive: false
      });
      puzzleCanvas.addEventListener("touchend", onEnd, {
        passive: false
      });
      puzzleCanvas.addEventListener("touchcancel", onEnd, {
        passive: false
      });
    };

    originalImage.src = randomPath;
  } // --- 버튼 이벤트 리스너 ---


  challengeButton.addEventListener('click', function () {
    startButton.textContent = "시작하기";
  });
  startButton.addEventListener('click', function () {
    if (startButton.textContent === "시작하기") {
      loadAndInitPuzzle();
      startTimer();
      startButton.textContent = "포기하기";
    } else if (startButton.textContent === "포기하기") {
      clearInterval(timerInterval);
      hidePopup();
      gameBox.style.display = 'none';
      location.reload();
    } else if (startButton.textContent === "완료") {
      var allCorrect = puzzlePieces.every(function (piece) {
        return piece.isCorrectlyPlaced;
      });

      if (allCorrect) {
        clearInterval(timerInterval);
        showPopup(clearPopup);
      }
    }
  });
  var popupConfirmButtons = document.querySelectorAll('.popup-game__btn');
  popupConfirmButtons.forEach(function (button) {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      hidePopup();
      location.reload();
    });
  });
  window.addEventListener('resize', function () {
    setPuzzleSize();
    drawPuzzle();
  });

  function eventGame() {
    var gameBtn = document.getElementById("eventGame-btn");
    var html = document.querySelector("html");

    function gameOpen() {
      gameBox.classList.add("is-active");
      html.classList.add("is-hidden");
    }

    gameBtn.addEventListener("click", gameOpen);
  }

  ;
  eventGame();
});