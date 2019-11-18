port module Main.Chat exposing (main)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Hello.Label


main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }



--
-- Model.
--


type alias Model =
    { server : String
    , input : String
    , messages : List String
    }


init : String -> ( Model, Cmd Msg )
init server =
    ( Model server "" [], Cmd.none )



--
-- Update.
--


type Msg
    = Input String
    | Send
    | NewEmoji String
    | NewMessage String


update : Msg -> Model -> ( Model, Cmd msg )
update msg ({ server, input, messages } as model) =
    case msg of
        Input newInput ->
            ( { model | input = newInput }, Cmd.none )

        Send ->
            ( { model | input = "" }, Cmd.none )

        NewEmoji newEmoji ->
            ( { model | input = input ++ newEmoji }, Cmd.none )

        NewMessage newMessage ->
            ( { model | messages = newMessage :: messages }, Cmd.none )



--
-- Subscriptions.
--


port emoji : (String -> msg) -> Sub msg


subscriptions : Model -> Sub Msg
subscriptions _ =
    emoji NewEmoji


--
-- View.
--


view : Model -> Html Msg
view model =
    div [ class "chat-container" ]
        [ input [ class "chat-message-input", onInput Input, value model.input ] []
        , button [ onClick Send ] [ text Hello.Label.text ]
        , div [ class "chat-messages" ] (List.map viewMessage (List.reverse model.messages))
        ]


viewMessage : String -> Html msg
viewMessage msg =
    div [] [ text msg ]
