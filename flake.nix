{
  description = "Dev Environment for younagi.dev Built with Nix";

  inputs = {
    # nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }@inputs:
    let
      systems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
      eachSystem = f: nixpkgs.lib.genAttrs systems (system: f nixpkgs.legacyPackages.${system});
    in
    {
      devShells = eachSystem (pkgs: {
        default = pkgs.mkShell {
          buildInputs = with pkgs; [
            astro-language-server
            bun
            commitizen
            lefthook
            nodejs # Necessary to run `bun dev`
            sqlite
            tailwindcss-language-server
            typescript-language-server
          ];

          # This is required to make the `sharp` lib work properly.
          # Refer to: https://discourse.nixos.org/t/how-to-solve-libstdc-not-found-in-shell-nix/25458
          LD_LIBRARY_PATH="${pkgs.stdenv.cc.cc.lib}/lib";

          shellHook = ''
            lefthook install
            echo "Welcome to the development environment for younagi.dev!"
          '';
        };
      });
    };
}
