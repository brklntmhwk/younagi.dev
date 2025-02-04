{
  description = "Pure Dev Environment for younagi.dev Built with Nix";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
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
            tailwindcss-language-server
            typescript-language-server
          ];

          shellHook = ''
            echo "Welcome to the development environment for younagi.dev!"
            lefthook install
          '';
        };
      });
    }
}
